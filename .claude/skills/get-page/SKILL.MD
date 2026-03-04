---
name: get-page
description: Lister les pages existantes dans Payload CMS (id, slug, titre, statut)
allowed-tools: Bash
---

# Lister les pages — Workflow

## Credentials & API

> Voir `../_common/auth.md` pour les credentials et les patterns Python urllib.
> Permissions requises : l'utilisateur doit avoir le rôle **admin** dans Payload.

---

## ⚠️ Règle d'exécution critique

**Toujours tout dans un seul appel Bash**, via un script Python inline.

Raisons :
- Le `TOKEN` bash ne persiste pas entre deux appels `Bash` distincts
- Les `&` dans les URLs curl sont interprétés comme "background" par bash
- Python `subprocess` avec une liste d'args évite tous ces problèmes

---

## Script complet — À copier tel quel dans un seul appel Bash

```bash
python3 - << 'EOF'
import subprocess, json

BASE_URL = "http://localhost:3022"

# 1. Login
login = subprocess.run([
    "curl", "-s", "-X", "POST", f"{BASE_URL}/api/users/login",
    "-H", "Content-Type: application/json",
    "-d", '{"email":"claudeadmin@gmail.com","password":"claudeadmin"}'
], capture_output=True, text=True)

token = json.loads(login.stdout)["token"]

# 2. Récupérer les pages
pages = subprocess.run([
    "curl", "-s", f"{BASE_URL}/api/pages?limit=100&depth=0",
    "-H", f"Authorization: JWT {token}"
], capture_output=True, text=True)

data = json.loads(pages.stdout)
for doc in data.get("docs", []):
    print(f"ID:{doc.get('id')} | slug:/{doc.get('slug','?')} | status:{doc.get('_status','?')} | {doc.get('title','(sans titre)')}")
print(f"\nTotal: {data.get('totalDocs', 0)} pages")
EOF
```

---

## Étape 2 : Présenter le résultat à l'utilisateur

Afficher le tableau des pages sous cette forme :

```
ID:6 | slug:/home            | status:draft     | Home
ID:5 | slug:/faq             | status:published | FAQ
ID:4 | slug:/qui-sommes-nous | status:published | Qui sommes-nous

Total: 3 pages
```

Puis demander : **Sur quelle page veux-tu travailler ?**
