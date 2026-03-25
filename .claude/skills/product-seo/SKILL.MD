---
name: product:seo
description: Génère une description SEO optimisée + layout blocks ProductSeoBlock pour un produit Payload CMS. Indépendant d'Alibaba — fonctionne pour n'importe quel produit.
---

# SEO produit — Description + Layout blocks

Génère 2 blocs `ProductSeoBlock` (image + texte alterné gauche/droite) et les PATCHe sur le produit Payload.

## Pré-requis

- **ID produit** Payload à mettre à jour
- **IDs media** disponibles dans la galerie du produit (au moins 2)
- **Titre FR** du produit
- **Specs brutes** (`specRows[]`) issues du parsing ou saisies manuellement

---

## Étape 1 — Récupérer le produit existant

```python
import subprocess, json, urllib.request

BASE_URL = "http://localhost:3008"
PRODUCT_ID = ...  # ID du produit à mettre à jour

login = subprocess.run([
    "curl", "-s", "-X", "POST", f"{BASE_URL}/api/users/login",
    "-H", "Content-Type: application/json",
    "-d", '{"email":"claudeadmin@gmail.com","password":"claudeadmin"}'
], capture_output=True, text=True)
token = json.loads(login.stdout)["token"]

result = subprocess.run([
    "curl", "-s", f"{BASE_URL}/api/products/{PRODUCT_ID}?depth=1",
    "-H", f"Authorization: JWT {token}"
], capture_output=True, text=True)

doc = json.loads(result.stdout)
title = doc.get("title", "")
gallery = doc.get("gallery", [])
existing_layout = doc.get("layout", [])

# Extraire les IDs media de la galerie
media_ids = [item["image"]["id"] if isinstance(item["image"], dict) else item["image"]
             for item in gallery if item.get("image")]

print(f"Titre: {title}")
print(f"Images disponibles: {media_ids}")
print(f"Layout existant: {len(existing_layout)} blocs")
```

---

## Étape 2 — Générer les 2 blocs SEO

Chaque bloc = ~200-250 mots. Alterner imagePosition left/right.

### Règles de rédaction SEO

- ❌ Ne jamais mentionner le pays d'origine, "Chine", "Guangdong", etc.
- ❌ Ne jamais mentionner le nom du fournisseur / fabricant
- ❌ Pas de liste de specs brute — intégrer les specs dans du texte fluide
- ✅ Marque = "Spaessentiel" uniquement si besoin de branding
- ✅ 2 blocs thématiques distincts (ex: "Bien-être & relaxation" + "Caractéristiques & installation")
- ✅ H2 clair + paragraphes bénéfices + specs intégrées naturellement

### Helpers Lexical

```python
def txt(text):
    return {"type":"text","text":text,"format":0,"detail":0,"mode":"normal","style":"","version":1}
def para(text):
    return {"type":"paragraph","format":"","indent":0,"version":1,"direction":"ltr",
            "children":[txt(text)],"textFormat":0,"textStyle":""}
def h2(text):
    return {"type":"heading","tag":"h2","format":"","indent":0,"version":1,"direction":"ltr",
            "children":[txt(text)]}
def richtext(children):
    return {"root":{"type":"root","format":"","indent":0,"version":1,"direction":"ltr","children":children}}
```

### Construction des 2 blocs

```python
# Générer le contenu à partir des specs et du titre — adapter selon le produit
# Bloc 1 : bénéfices / expérience utilisateur
content_bloc1 = richtext([
    h2("Titre bloc 1 — bénéfices produit"),
    para("Paragraphe 1 : intro + bénéfices clés (matériau, usage, ambiance)"),
    para("Paragraphe 2 : specs intégrées naturellement (dimensions, capacité, matière)"),
    para("Paragraphe 3 : usage recommandé, entretien, durabilité"),
])

# Bloc 2 : caractéristiques techniques + installation
content_bloc2 = richtext([
    h2("Titre bloc 2 — caractéristiques & installation"),
    para("Paragraphe 1 : specs techniques principales (puissance, dimensions, poids)"),
    para("Paragraphe 2 : installation, compatibilité, options"),
    para("Paragraphe 3 : garantie, service, pourquoi choisir ce modèle"),
])

# Construire les blocs layout
# media_ids[0] pour le bloc 1, media_ids[1] pour le bloc 2 (ou inverser)
seo_blocks = [
    {
        "blockType": "productSeoBlock",
        "title": "Titre H2 du bloc 1",
        "content": content_bloc1,
        "media": media_ids[0],
        "imagePosition": "left",
    },
    {
        "blockType": "productSeoBlock",
        "title": "Titre H2 du bloc 2",
        "content": content_bloc2,
        "media": media_ids[1] if len(media_ids) > 1 else media_ids[0],
        "imagePosition": "right",
    },
]
```

---

## Étape 3 — PATCH le produit

⚠️ Toujours envoyer `gallery` + `layout` ensemble pour éviter les erreurs de validation.

```python
body = {
    "gallery": [{"image": mid} for mid in media_ids],
    "layout": existing_layout + seo_blocks,  # conserver les blocs existants
}

payload_bytes = json.dumps(body).encode("utf-8")

req = urllib.request.Request(
    f"{BASE_URL}/api/products/{PRODUCT_ID}",
    data=payload_bytes,
    headers={"Content-Type": "application/json", "Authorization": f"JWT {token}"},
    method="PATCH"
)

with urllib.request.urlopen(req) as resp:
    doc = json.loads(resp.read()).get("doc", {})
    print(f"✓ ID:{doc.get('id')} | layout: {len(doc.get('layout', []))} blocs")
```

---

## Étape 4 — Vérifier en front

```
http://localhost:3000/products/{slug}
```

Les 2 blocs doivent apparaître sous la fiche produit avec image gauche/droite alternée.

---

## Notes

- **ProductSeoBlock** est défini dans `src/blocks/ProductSeoBlock/config.ts` — slug `productSeoBlock`.
- **Longueur** : ~200-250 mots par bloc — assez long pour le SEO, assez court pour que l'image ne soit pas étirée.
- **Images** : utiliser des images différentes pour chaque bloc. Éviter la première image galerie (déjà utilisée en hero).
- **Blocs existants** : ce skill préserve le layout existant (`existing_layout`) et ajoute les blocs SEO en fin de tableau. Pour remplacer entièrement, utiliser `"layout": seo_blocks` sans concaténation.
- **Indépendant d'Alibaba** : ce skill fonctionne sur n'importe quel produit Payload, qu'il vienne d'Alibaba ou non.
