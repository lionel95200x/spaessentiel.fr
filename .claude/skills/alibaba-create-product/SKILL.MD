---
name: alibaba:create-product
description: Parser une fiche produit Alibaba (URL unique) et créer/mettre à jour le produit dans Payload CMS (title, slug, description, gallery, supplier, categories, inventory, price)
---

# Créer un produit depuis une fiche Alibaba — Workflow

## Dépendances

> **Parsing** : voir `../alibaba-parsing/SKILL.MD` pour le scraping Playwright (titre, prix, specs, images).
> **Payload** : voir `../payload-common/SKILL.MD` pour le login, l'upload d'images et le format Lexical richText.

---

## Étape 1 — Demander les infos

> - **URL Alibaba** de la fiche produit
> - **Titre FR** souhaité (si non fourni, utiliser le titre extrait)
> - **ID catégorie Payload** (utiliser `/get-categories` si besoin)
> - **ID supplier Payload** (vérifier via `GET /api/suppliers?limit=50` — créer si inexistant)
> - **Prix de vente** en centimes EUR (ex: `189900` pour 1 899 €) — optionnel
> - **Inventory** par défaut (ex: `10`)
> - **ID produit existant** à mettre à jour, ou laisser vide pour créer

---

## Étape 2 — Parser la fiche Alibaba

Suivre `/alibaba:parsing` → récupérer : `title`, `supplierPriceCents`, `supplierName`, `supplierHref`, `moq`, `specRows`, `images[]`.

---

## Étape 3 — Login Payload

```python
import subprocess, json

BASE_URL = "http://localhost:3008"

login = subprocess.run([
    "curl", "-s", "-X", "POST", f"{BASE_URL}/api/users/login",
    "-H", "Content-Type: application/json",
    "-d", '{"email":"claudeadmin@gmail.com","password":"claudeadmin"}'
], capture_output=True, text=True)
token = json.loads(login.stdout)["token"]
```

---

## Étape 4 — Uploader les images

```python
import urllib.request, os

def upload_image(img_url, alt_text):
    tmp = f"/tmp/product_{abs(hash(img_url))}.jpg"
    try:
        req = urllib.request.Request(img_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as r:
            with open(tmp, 'wb') as f:
                f.write(r.read())
    except Exception as e:
        print(f"  ⚠ Download failed: {e}")
        return None

    result = subprocess.run([
        "curl", "-s", "-X", "POST", f"{BASE_URL}/api/media",
        "-H", f"Authorization: JWT {token}",
        "-F", f"file=@{tmp};type=image/jpeg",
        "-F", f'_payload={{"alt":"{alt_text[:80]}"}}',
    ], capture_output=True, text=True)

    try:
        media_id = json.loads(result.stdout).get("doc", {}).get("id")
        if media_id:
            os.remove(tmp)
            print(f"  ✓ Media ID: {media_id}")
        return media_id
    except Exception as e:
        print(f"  ✗ Upload error: {e}")
        return None

media_ids = []
for i, img_url in enumerate(images, 1):
    print(f"  [{i}/{len(images)}] Uploading...")
    mid = upload_image(img_url, title_fr)
    if mid:
        media_ids.append(mid)
```

---

## Étape 5 — Construire la description Lexical

```python
def txt(text):
    return {"type":"text","text":text,"format":0,"detail":0,"mode":"normal","style":"","version":1}
def para(text):
    return {"type":"paragraph","format":"","indent":0,"version":1,"direction":"ltr",
            "children":[txt(text)],"textFormat":0,"textStyle":""}
def h2(text):
    return {"type":"heading","tag":"h2","format":"","indent":0,"version":1,"direction":"ltr",
            "children":[txt(text)]}

description = {
    "root": {
        "type":"root","format":"","indent":0,"version":1,"direction":"ltr",
        "children": [
            h2("Caractéristiques techniques"),
            *[para(spec) for spec in spec_rows[:12]],
        ]
    }
}
```

---

## Étape 6 — Créer ou mettre à jour le produit

**Toujours `python3 urllib`** — jamais `curl -d @file` avec du JSON UTF-8.

```python
body = {
    "_status": "published",
    "title": title_fr,
    "generateSlug": True,
    "description": description,
    "gallery": [{"image": mid} for mid in media_ids],
    "supplier": SUPPLIER_ID,
    "supplierUrl": URL_ALIBABA,
    "supplierPrice": supplier_price_cents,
    "priceInUSDEnabled": True,
    "priceInUSD": price_eur_cents,
    "categories": [CATEGORY_ID],
    "inventory": INVENTORY,
    "meta": {
        "title": f"{title_fr} | Spaessentiel",
        "description": f"Découvrez {title_fr} — {spec_rows[0] if spec_rows else ''}"
    }
}

payload = json.dumps(body).encode("utf-8")

# POST = nouveau produit
req = urllib.request.Request(
    f"{BASE_URL}/api/products",
    data=payload,
    headers={"Content-Type": "application/json", "Authorization": f"JWT {token}"},
    method="POST"
)
# PATCH = mise à jour → remplacer l'URL par f"{BASE_URL}/api/products/{PRODUCT_ID}" + method="PATCH"

with urllib.request.urlopen(req) as resp:
    doc = json.loads(resp.read()).get("doc", {})
    print(f"✓ ID:{doc.get('id')} | slug:{doc.get('slug')}")
```

---

## Étape 7 — Vérifier

```python
result = subprocess.run([
    "curl", "-s", f"{BASE_URL}/api/products/{product_id}?depth=1",
    "-H", f"Authorization: JWT {token}"
], capture_output=True, text=True)

doc = json.loads(result.stdout)
print(f"Title:         {doc.get('title')}")
print(f"Slug:          {doc.get('slug')}")
print(f"Status:        {doc.get('_status')}")
print(f"Gallery:       {len(doc.get('gallery', []))} images")
print(f"supplierPrice: {doc.get('supplierPrice')}")
print(f"priceInUSD:    {doc.get('priceInUSD')}")
print(f"inventory:     {doc.get('inventory')}")
print(f"categories:    {doc.get('categories')}")
```

---

## Notes

- **Slug** : `"generateSlug": true` — Payload le génère depuis le titre FR.
- **Supplier** : vérifier `GET /api/suppliers?limit=50`. Créer si inexistant avant l'import.
- **Prix** : `supplierPrice` = prix Alibaba min en centimes. `priceInUSD` = prix de vente.
- **Categories** : utiliser `/get-categories` si l'ID n'est pas connu.
- **PATCH gallery** : toujours envoyer `gallery` + `layout` ensemble dans le même PATCH — sinon les blocs layout perdent leurs images requises (erreur 400).
- **Description** : ne jamais mentionner le pays d'origine ni le nom de la marque fournisseur. La marque, c'est Spaessentiel.
- **SEO layout** : après création, lancer `/product:seo` pour générer les blocs description optimisés avec image.
