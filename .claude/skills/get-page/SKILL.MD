---
name: get-page
description: Lister les pages existantes dans Payload CMS (id, slug, titre, statut)
allowed-tools: Bash
---

# Lister les pages

**Collection** : `pages`

Utiliser le script LIST de `../payload-common/crud.md` avec `COLLECTION = "pages"`.

---

## Résultat attendu

```
ID:6 | slug:/home            | status:draft     | Home
ID:5 | slug:/faq             | status:published | FAQ

Total: 2 pages
```

Puis demander : **Sur quelle page veux-tu travailler ?**

Pour publier une page → utiliser le script PUBLISH de `../payload-common/crud.md` avec `COLLECTION = "pages"` et l'ID choisi.
