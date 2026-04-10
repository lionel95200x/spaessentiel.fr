---
name: get-categories
description: Lister les catégories existantes dans Payload CMS (id, slug, titre, statut)
allowed-tools: Bash
---

# Lister les catégories

**Collection** : `categories`

Utiliser le skill `/payload-common` avec `COLLECTION = "categories"`.

---

## Résultat attendu

```
ID:3 | slug:/sport           | status:published | Sport
ID:2 | slug:/bien-etre       | status:published | Bien-être

Total: 2 categories
```

Puis demander : **Sur quelle catégorie veux-tu travailler ?**

Pour publier une catégorie → utiliser le skill `/payload-common` avec `COLLECTION = "categories"` et l'ID choisi.
