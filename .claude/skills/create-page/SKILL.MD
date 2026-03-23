---
name: create-page
description: Créer une nouvelle page via l'API Payload avec les blocks existants ou de nouveaux blocks custom
---

# Créer une page — Workflow

## Credentials API

> Voir `../payload-common/auth.md` pour les credentials, le login bash, l'upload d'images et le format Lexical richText.

---

## Étape 1 : Demander quelle page créer

Poser cette question à l'utilisateur :

> **Quelle page veux-tu créer ?**
> Décris les sections que tu imagines : image + texte, colonnes, formulaire, etc.

---

## Étape 2 : Découvrir les blocks disponibles

**Ne jamais hardcoder la liste des blocks.** Lire les sources :

```
src/blocks/RenderBlocks.tsx           ← liste des blockTypes enregistrés
src/blocks/*/config.ts                ← schéma de chaque block (fields)
src/components/ui/shop-home-layout.tsx ← primitifs UI disponibles
```

Lire ces fichiers pour connaître exactement ce qui existe avant de proposer quoi que ce soit.

---

## Étape 3 : Quand créer un nouveau block ?

Uniquement si aucun block existant ne convient **et** le besoin est réutilisable sur d'autres pages.

**Règles absolues pour un nouveau block :**
- ❌ Jamais de Tailwind dans le composant du block
- ✅ Composer uniquement avec les primitifs de `src/components/ui/shop-home-layout.tsx`
- ✅ Si un primitif manque → l'ajouter dans ce fichier (source unique de vérité du thème)
- ✅ Enregistrer dans `src/collections/Pages/index.ts` et `src/blocks/RenderBlocks.tsx`

---

## Étape 4 : Créer la page via l'API

### Authentification

> Utiliser le snippet login de `../payload-common/auth.md` pour récupérer `$TOKEN`.

### Créer la page (POST)

```bash
curl -s -X POST "http://localhost:3022/api/pages" \
  -b /tmp/payload_cookies.txt \
  -H "Content-Type: application/json" \
  -d '{
    "title": "...",
    "_status": "published",
    "slug": "...",
    "hero": { "type": "lowImpact", "richText": { ... } },
    "layout": [ { "blockType": "...", ... } ]
  }'
```

### Mettre à jour une page existante (PATCH)

```bash
curl -s -X PATCH "http://localhost:3022/api/pages/ID" \
  -b /tmp/payload_cookies.txt \
  -H "Content-Type: application/json" \
  -d '{ "layout": [...] }'
```

### Uploader une image

```bash
curl -s -X POST "http://localhost:3022/api/media" \
  -b /tmp/payload_cookies.txt \
  -F "file=@/chemin/image.jpg;type=image/jpeg" \
  -F '_payload={"alt":"Description"}'
# → retourne { "id": 18 } → utiliser dans "media": 18
```

---

## Étape 5 : Vérifier

```bash
curl -s "http://localhost:3022/api/pages?where[slug][equals]=mon-slug&depth=1"
# naviguer sur http://localhost:3000/mon-slug
```
