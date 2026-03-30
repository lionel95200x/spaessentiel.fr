---
name: alibaba:import-page
description: Scraper une page listing Alibaba (ex: featureproductlist) avec Playwright pour extraire tous les produits (titres, prix, images), créer une gamme FR, puis importer en masse dans Payload CMS avec supplier, supplierPrice, categories et inventory.
---

# Import masse depuis une page Alibaba — Workflow

## Credentials & Auth

> Voir `../../payload-common/auth.md` pour le login, l'upload d'images et le format Lexical richText.

---

## Étape 1 — Demander les infos

Poser ces questions :

> - **URL de la page listing Alibaba** (ex: `https://fsperfectspa.en.alibaba.com/featureproductlist.html`)
> - **ID catégorie Payload** cible (utiliser `/get-categories` si besoin)
> - **ID supplier Payload** (vérifier via `GET /api/suppliers`)
> - **Inventory par défaut** (ex: `100`)
> - **Gamme FR souhaitée** : demander la direction (ex: "sensorielle", "nordique", "épurée") avant de nommer

---

## Étape 2 — Lancer Playwright et extraire les données

### 2a — Résoudre le problème de Chrome déjà ouvert

Si Playwright échoue avec "Ouverture dans une session de navigateur existante" :

```bash
pkill -f "Google Chrome" 2>/dev/null; sleep 2
rm -f "/Users/lionelbueno/Library/Caches/ms-playwright/mcp-chrome-b7e49b4/SingletonLock"
rm -f "/Users/lionelbueno/Library/Caches/ms-playwright/mcp-chrome-b7e49b4/SingletonSocket"
```

### 2b — Naviguer et scroller pour déclencher le lazy loading

```javascript
await page.goto(URL_LISTING);
// Attendre le rendu complet
await new Promise(r => setTimeout(r, 3000));
```

### 2c — Extraire les URLs et titres

Les liens produit sont dans `a[href*="product-detail"]`. Extraire via `page.evaluate()` :

```javascript
const links = [...document.querySelectorAll('a[href*="product-detail"]')];
const unique = [...new Map(links.map(a => [a.href, a])).values()];
// title = link.innerText.trim()
// url = link.href
```

### 2d — Extraire les images produit

Les thumbnails sont dans `img.react-dove-image` (classe spécifique Alibaba). **Scroller d'abord** pour déclencher le lazy loading :

```javascript
// Scroll complet pour charger toutes les images lazy
window.scrollTo(0, document.body.scrollHeight);
await new Promise(r => setTimeout(r, 2000));

const imgs = [...document.querySelectorAll('img.react-dove-image')]
  .filter(img => img.naturalWidth >= 200)
  .map(img => img.src);
return [...new Set(imgs)];
```

### 2e — Extraire les prix

Les prix sont dans les éléments `[ref=eXXX]` du snapshot. Récupérer via le snapshot Playwright ou via `innerText` des éléments prix :

```javascript
// Prix visibles dans le texte des éléments proches des liens
// Format Alibaba : "1 735,47-2 082,91 €/jeu"
// → Prendre la valeur min, retirer espaces, virgule→point, multiplier ×100 pour centimes
// Ex: "1 735,47" → parseFloat("1735.47") * 100 → 173547
```

---

## Étape 3 — Associer images aux produits

L'ordre des `react-dove-image` correspond à l'ordre d'affichage sur la page.
Faire le mapping manuellement si nécessaire (certains produits sidebar n'ont pas d'image).

---

## Étape 4 — Proposer une gamme FR

Avant d'importer, **toujours proposer une gamme** à valider :

```
Exemple pour produits spa/balnéo :

Série Évasion (2-4P)   → Évasion Duo · Évasion Balboa
Série Sérénité (5-6P)  → Sérénité Air · Sérénité Pure · Sérénité Ronde...
Série Horizon (8-12P)  → Horizon 8 · Horizon 12 · Horizon Prestige...
Série Infini (swim spa)→ Infini 5.8 · Infini Pro · Infini Hôtel
Hors gamme             → Vapeur Essentiel · Éveil
```

Attendre la validation utilisateur avant de lancer l'import.

---

## Étape 5 — Script d'import Python

```python
import subprocess, json, re, time, urllib.request, os

BASE_URL = "http://localhost:3022"
CATEGORY_ID = 5       # ← à adapter
SUPPLIER_ID = 1       # ← à adapter
INVENTORY = 100       # ← à adapter

# Login
login = subprocess.run([
    "curl", "-s", "-X", "POST", f"{BASE_URL}/api/users/login",
    "-H", "Content-Type: application/json",
    "-d", '{"email":"claudeadmin@gmail.com","password":"claudeadmin"}'
], capture_output=True, text=True)
token = json.loads(login.stdout)["token"]

def richtext(text):
    return {"root": {"type":"root","format":"","indent":0,"version":1,"direction":"ltr",
        "children": [{"type":"paragraph","format":"","indent":0,"version":1,"direction":"ltr",
            "textFormat":0,"textStyle":"",
            "children":[{"type":"text","text":text,"format":0,"detail":0,"mode":"normal","style":"","version":1}]
        }]
    }}

def upload_image(img_url, title):
    tmp = f"/tmp/import_{abs(hash(img_url))}.jpg"
    try:
        req = urllib.request.Request(img_url, headers={"User-Agent":"Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as r:
            with open(tmp, 'wb') as f: f.write(r.read())
    except Exception as e:
        print(f"  ⚠ Download failed: {e}"); return None
    result = subprocess.run([
        "curl", "-s", "-X", "POST", f"{BASE_URL}/api/media",
        "-H", f"Authorization: JWT {token}",
        "-F", f"file=@{tmp};type=image/jpeg",
        "-F", f'_payload={{"alt":"{title[:50]}"}}',
    ], capture_output=True, text=True)
    try:
        media_id = json.loads(result.stdout).get("doc",{}).get("id")
        if media_id: os.remove(tmp)
        return media_id
    except: return None

def create_product(title, slug, price_cents, supplier_url, img_url):
    media_id = upload_image(img_url, title) if img_url else None
    payload = {
        "_status": "published",
        "title": title,
        "slug": slug,
        "priceInUSDEnabled": True,
        "priceInUSD": price_cents,
        "categories": [CATEGORY_ID],
        "supplier": SUPPLIER_ID,
        "supplierUrl": supplier_url,
        "supplierPrice": price_cents,
        "inventory": INVENTORY,
        "description": richtext(title),
        "layout": [],
    }
    if media_id:
        payload["gallery"] = [{"image": media_id}]
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{BASE_URL}/api/products",
        data=body,
        headers={"Content-Type":"application/json","Authorization":f"JWT {token}"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read()).get("doc",{}).get("id")
    except urllib.error.HTTPError as e:
        print(f"  ✗ {e.read().decode()[:200]}"); return None

# ── Lancer l'import ──────────────────────────────────────────────────────────
products = [
    # { "title": "...", "slug": "...", "price": 173547, "supplier_url": "https://...", "img": "https://..." },
]

for i, p in enumerate(products, 1):
    print(f"[{i:2}/{len(products)}] {p['title']}")
    prod_id = create_product(p["title"], p["slug"], p["price"], p["supplier_url"], p.get("img"))
    print(f"       → Product ID: {prod_id} {'✓' if prod_id else '✗'}")
    time.sleep(0.3)
```

---

## Étape 6 — Renommer avec la gamme FR (PATCH en masse)

```python
# Après validation de la gamme par l'utilisateur
renames = {
    9:  ("Sérénité Air",  "serenite-air"),
    10: ("Horizon 12",    "horizon-12"),
    # ...
}
for prod_id, (title, slug) in renames.items():
    payload = json.dumps({"title": title, "slug": slug}).encode()
    req = urllib.request.Request(
        f"{BASE_URL}/api/products/{prod_id}",
        data=payload,
        headers={"Content-Type":"application/json","Authorization":f"JWT {token}"},
        method="PATCH"
    )
    with urllib.request.urlopen(req) as r:
        doc = json.loads(r.read()).get("doc",{})
        print(f"✓ ID:{prod_id} → {doc.get('title')} [{doc.get('slug')}]")
```

---

## Notes importantes

- **Chrome déjà ouvert** : tuer le process + supprimer le lock file (voir étape 2a)
- **Images lazy** : toujours scroller avant d'extraire les `react-dove-image`
- **Prix Alibaba** : prendre la valeur **min** de la fourchette × 100 (centimes)
- **Gamme FR** : toujours proposer et valider avant d'importer les titres
- **Slug** : version ASCII du titre FR (accents retirés, espaces → tirets)
- **Pages multiples** : la page listing a souvent 4 pages — demander si on scanne tout
- **Supplier** : vérifier `GET /api/suppliers` — créer si inexistant avant l'import
