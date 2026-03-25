---
name: alibaba:parsing
description: Scraper une fiche produit Alibaba avec Playwright — extrait titre, prix, specs, images, supplier. Réutilisable par tout skill d'import.
---

# Parser une fiche Alibaba — Scraping Playwright

## Pré-requis — Chrome déjà ouvert

Si Playwright échoue avec "session de navigateur existante" :

```bash
pkill -f "Google Chrome" 2>/dev/null; sleep 2
rm -f "/Users/lionelbueno/Library/Caches/ms-playwright/mcp-chrome-b7e49b4/SingletonLock"
rm -f "/Users/lionelbueno/Library/Caches/ms-playwright/mcp-chrome-b7e49b4/SingletonSocket"
```

**Exécution Playwright** via le skill installé :
```bash
SKILL_DIR="/Users/lionelbueno/.claude/plugins/cache/playwright-skill/playwright-skill/4.1.0/skills/playwright-skill"
cd "$SKILL_DIR" && node run.js /tmp/playwright-test-alibaba-parse.js
```

---

## Script complet — /tmp/playwright-test-alibaba-parse.js

```javascript
const { chromium } = require('playwright');

const TARGET_URL = 'REMPLACER_PAR_URL_ALIBABA';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Navigating...');
  await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Scroll complet pour déclencher le lazy loading
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    // Titre
    const title = document.querySelector('h1')?.innerText?.trim();

    // Prix — sélecteur validé : [class*="price"] innerText
    // Exemple de texte : "1 - 9 jeu\n2 574,35 €\n>= 10 jeu\n2 487,38 €"
    const priceEl = document.querySelector('[class*="price"]');
    let supplierPriceCents = null;
    let priceCurrency = null;
    if (priceEl) {
      const priceText = priceEl.innerText;
      // Cherche le premier montant (format FR : "2 574,35 €" ou "1 028.00 USD")
      const match = priceText.match(/([\d][\d\s]*[\d][,.][\d]{2})\s*(€|USD|EUR)/);
      if (match) {
        const raw = match[1].replace(/\s/g, '').replace(',', '.');
        supplierPriceCents = Math.round(parseFloat(raw) * 100);
        priceCurrency = match[2] === '€' ? 'EUR' : match[2];
      }
    }

    // Specs — sélecteur validé : [data-testid="module-attribute-row"]
    const specEls = document.querySelectorAll('[data-testid="module-attribute-row"]');
    const specRows = [];
    specEls.forEach(row => {
      const name = row.querySelector('[data-testid="module-attribute-name-text"]')?.innerText?.trim();
      const value = row.querySelector('[data-testid="module-attribute-value-text"]')?.innerText?.trim();
      if (name && value) specRows.push(`${name} : ${value}`);
    });

    // Key details (produit mis en avant en haut)
    const keyDetails = [...document.querySelectorAll('[data-testid="product-detail-text-sort"] span')]
      .map(el => el.innerText.trim())
      .filter(t => t.length > 2);

    // Supplier name
    const supplierEl =
      document.querySelector('.company-name-text') ||
      document.querySelector('[class*="company-name"]') ||
      document.querySelector('a[href*=".en.alibaba.com"]');
    const supplierName = supplierEl?.innerText?.trim();
    const supplierHref = supplierEl?.href;

    // MOQ
    const moq = document.body.innerText.match(/MOQ[:\s]+([^\n]+)/i)?.[1]?.trim();

    return { title, supplierPriceCents, priceCurrency, supplierName, supplierHref, moq, specRows, keyDetails };
  });

  // Images produit — sélecteur validé : section description Alibaba
  // [id*="structure_descption_productDescription"] img  OU  [data-testid="module-structure-description"] img
  const images = await page.evaluate(() => {
    const descImgs = [
      ...document.querySelectorAll('[id*="structure_descption_productDescription"] img'),
      ...document.querySelectorAll('[data-testid="module-structure-description"] img'),
    ];
    const seen = new Set();
    return descImgs
      .map(img => img.src)
      .filter(src => {
        if (!src.startsWith('http') || seen.has(src)) return false;
        seen.add(src);
        return true;
      })
      .slice(0, 10);
  });

  const result = { ...data, images };
  console.log('\n=== RESULT ===');
  console.log(JSON.stringify(result, null, 2));

  await browser.close();
})();
```

---

## Résultat — Structure retournée

```json
{
  "title": "Luxury Modern Design Outdoor Hemlock Stainless Steel...",
  "supplierPriceCents": 257435,
  "priceCurrency": "EUR",
  "supplierName": "Guangzhou Perfect Spa...",
  "supplierHref": "https://perfectspa.en.alibaba.com/index.html",
  "moq": "1 set",
  "specRows": [
    "Material : Hemlock Wood",
    "Capacity : 2 Persons",
    "Heater Power : 9 KW",
    "Dimensions : 1800 x 1200 x 2000 mm",
    "Type : Outdoor"
  ],
  "keyDetails": ["Hemlock Wood", "Outdoor", "2 Persons"],
  "images": [
    "https://sc04.alicdn.com/kf/...",
    "https://sc04.alicdn.com/kf/..."
  ]
}
```

---

## Notes

- **Sélecteurs validés** sur la fiche Hemlock Stainless 2026-03-25 — si une fiche change de layout, tester `[data-testid="module-attribute-row"]` en premier.
- **Prix** : Alibaba affiche une fourchette par quantité — toujours prendre le **premier montant** (prix unitaire le plus haut = prix fournisseur réaliste). Stocker en **centimes**.
- **Images** : viennent de la section description produit (pas la galerie thumbnail). Max 10.
- **Captcha** : en cas d'échec, recharger la page — passe généralement au 2e chargement.
- **Lazy loading** : scroll complet AVANT d'extraire les images, sinon `src` vide.
