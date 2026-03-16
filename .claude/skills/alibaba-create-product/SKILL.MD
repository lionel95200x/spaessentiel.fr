---
name: alibaba:create-product
description: Parser une fiche produit Alibaba (URL unique) avec Playwright et créer/mettre à jour le produit dans Payload CMS (title, description, gallery, supplier infos)
---

# Créer un produit depuis Alibaba — Workflow

## Credentials & Auth

> Voir `../_common/auth.md` pour le login, l'upload d'images et le format Lexical richText.

---

## Étape 1 — Demander l'URL et l'ID produit

Poser ces questions :

> - **URL Alibaba** du produit à importer
> - **ID du produit Payload** à mettre à jour (ex: `8`), ou laisser vide pour créer un nouveau

---

## Étape 2 — Parser la page Alibaba avec Playwright

```javascript
// 1. Naviguer vers l'URL
await page.goto(URL_ALIBABA);
// → Si captcha slider : faire glisser via mouse.down/move/up
// → Si "Faites glisser pour vérifier" → attendre 3s et recharger

// 2. Extraire les données clés
const data = await page.evaluate(() => {
  const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
  const titleIdx = lines.findIndex(l => l.length > 10 && !l.includes('alibaba'));

  return {
    title: document.querySelector('h1')?.innerText?.trim(),
    supplierName: document.querySelector('a[href*="alibaba.com/index"]')?.innerText?.trim(),
    moq: document.body.innerText.match(/MOQ[:\s]+([^\n]+)/i)?.[1]?.trim(),
    productSection: lines.slice(titleIdx, titleIdx + 60),
  };
});

// 3. Extraire les images haute résolution (> 700px)
const images = await page.evaluate(() =>
  [...document.querySelectorAll('img')]
    .map(img => ({ src: img.src, w: img.naturalWidth, alt: img.alt }))
    .filter(img => img.src.startsWith('http') && img.w > 700)
    .slice(0, 6)
);
```

**Données à extraire :**
- `title` — balise H1
- `supplierName` + `supplierUrl` (lien vers la page fournisseur)
- Specs : matériau, dimensions, puissance, garantie, MOQ
- `images[]` — jusqu'à 6 images haute résolution (800-960px)
- `supplierPrice` — prix numérique (min de la fourchette, en USD ou EUR)

---

## Étape 3 — Login Payload

```bash
TOKEN=$(curl -s -X POST "http://localhost:3022/api/users/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"claudeadmin@gmail.com","password":"claudeadmin"}' \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['token'])")
```

---

## Étape 4 — Uploader les images

Pour chaque image (voir `../_common/auth.md`) :

```bash
curl -sL "$IMAGE_URL" -o /tmp/sauna-N.jpg

MEDIA_ID=$(curl -s -X POST "http://localhost:3022/api/media" \
  -H "Authorization: JWT $TOKEN" \
  -F "file=@/tmp/sauna-N.jpg;type=image/jpeg" \
  -F '_payload={"alt":"Nom du produit"}' \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['doc']['id'])")
```

Collecter tous les IDs → `[22, 23, 24, 25, 26, 27]`

---

## Étape 5 — PATCH le produit Payload

**Toujours utiliser python3 urllib** (pas `curl -d @file`) pour éviter les bugs d'encodage UTF-8.

```python
import json, urllib.request

TOKEN = "..."
PRODUCT_ID = 8

def txt(text):
    return {"type":"text","text":text,"format":0,"detail":0,"mode":"normal","style":"","version":1}
def para(text):
    return {"type":"paragraph","format":"","indent":0,"version":1,"children":[txt(text)],"direction":"ltr"}
def h2(text):
    return {"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[txt(text)],"direction":"ltr"}

description = {
    "root": {
        "type":"root","format":"","indent":0,"version":1,"direction":"ltr",
        "children": [
            h2("Caracteristiques"),
            para("Marque : ..."),
            para("Materiau : Bois solide"),
            para("Dimensions : 1200 x 1050 x 1900 mm"),
            para("Puissance : 6 KW"),
            para("Garantie : 2 ans"),
            h2("Fournisseur"),
            para("Nom du fournisseur - Pays - N ans d anciennete"),
            para("MOQ : 1 jeu"),
        ]
    }
}

body = {
    "title": "Nom du produit",
    "generateSlug": True,
    "description": description,
    "gallery": [
        {"image": 22}, {"image": 23}, {"image": 24},
        {"image": 25}, {"image": 26}, {"image": 27},
    ],
    "supplierUrl": "https://www.alibaba.com/product-detail/...",
    "supplierPrice": 1028,   # numérique — min de la fourchette de prix
    "meta": {
        "title": "Nom produit | Spaessentiel",
        "description": "Description SEO courte du produit."
    }
}

payload = json.dumps(body).encode("utf-8")
req = urllib.request.Request(
    f"http://localhost:3022/api/products/{PRODUCT_ID}",
    data=payload,
    headers={"Content-Type": "application/json", "Authorization": f"JWT {TOKEN}"},
    method="PATCH"
)
with urllib.request.urlopen(req) as resp:
    doc = json.loads(resp.read()).get("doc", {})
    print("ID:", doc.get("id"))
    print("Slug:", doc.get("slug"))
    print("Gallery:", len(doc.get("gallery", [])))
```

---

## Étape 6 — Vérifier

```bash
curl -s "http://localhost:3022/api/products/8?depth=1" \
  -H "Authorization: JWT $TOKEN" \
  | python3 -c "
import json,sys
d=json.load(sys.stdin)
print('Title:', d.get('title'))
print('Slug:', d.get('slug'))
print('Gallery:', len(d.get('gallery',[])))
print('supplierUrl:', d.get('supplierUrl'))
print('supplierPrice:', d.get('supplierPrice'))
"
```

---

## Notes importantes

- **Captcha Alibaba** : si le slider apparaît, tenter `page.mouse` drag. Si ça échoue (error:wSVCWt), recharger la page — elle se charge souvent au 2e chargement.
- **Prix** : Alibaba affiche les prix en fourchette (ex: `1 028 - 1 500 €`). Prendre la valeur **minimum** pour `supplierPrice`.
- **Images** : filtrer `naturalWidth > 700` pour avoir uniquement les photos produit (pas les icônes/logos).
- **RichText** : ne jamais utiliser `curl -d @file` avec du JSON UTF-8 complexe → toujours `python3 urllib`.
- **Slug** : laisser `"generateSlug": true` — Payload le génère automatiquement depuis le titre.
