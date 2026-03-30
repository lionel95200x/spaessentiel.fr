---
name: get-image-alibaba
description: Extraire les URLs d'images produit depuis une page Alibaba via Playwright. Utilisé par alibaba-parsing.
---

# Extraire les images produit depuis une page Alibaba

> /payload-common

## Méthode — Regex sur le HTML brut

Les images Alibaba sont chargées en lazy loading — les sélecteurs DOM sont souvent vides. La méthode fiable est le **regex directement sur le HTML de la page**.

```javascript
// Appeler après page.goto() + scroll
async function extractAlibabaImages(page, maxImages = 10) {
  return await page.evaluate((max) => {
    const html = document.documentElement.innerHTML;
    const found = [
      ...(html.match(/https?:\/\/sc04\.alicdn\.com\/kf\/[^"'\s<>]+\.(?:jpg|jpeg|png)/gi) || []),
      ...(html.match(/\/\/sc04\.alicdn\.com\/kf\/[^"'\s<>]+\.(?:jpg|jpeg|png)/gi) || []).map(s => 'https:' + s),
    ];
    return [...new Set(found)]
      .filter(s => !/_\d+x\d+/.test(s) && !s.includes('.webp'))
      .slice(0, max);
  }, maxImages);
}
```

## Usage dans alibaba-parsing

```javascript
// Après page.goto() et scroll complet
const images = await extractAlibabaImages(page, 10);
```

## Notes

- Filtre automatique : thumbnails `_80x80`, `_100x100`, `_250x250` et `.webp` exclus.
- URLs `//sc04...` normalisées en `https:` automatiquement.
- Toujours scroller avant d'appeler — déclenche le chargement du HTML lazy.
