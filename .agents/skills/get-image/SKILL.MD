---
name: get-image
description: Lister les médias existants dans Payload CMS (id, filename, alt)
allowed-tools: Bash
---

# Lister les médias

**Collection** : `media`

 utiliser le skill `/payload-common` avec `COLLECTION = "media"`, en affichant `filename` et `alt`.

---

## Script

```python
COLLECTION = "media"

result = subprocess.run([
    "curl", "-s", f"{BASE_URL}/api/{COLLECTION}?limit=100&depth=0",
    "-H", f"Authorization: JWT {token}"
], capture_output=True, text=True)

data = json.loads(result.stdout)
for doc in data.get("docs", []):
    print(f"ID:{doc.get('id')} | {doc.get('filename','?')} | alt:{doc.get('alt','') or '(vide)'}")
print(f"\nTotal: {data.get('totalDocs', 0)} médias")
```

---

## Résultat attendu

```
ID:66 | serenite5_g6.jpg | alt:Sérénité 5 - 6
ID:49 | balneo_5716.jpg  | alt:Bain à remous...

Total: 45 médias
```

Puis demander : **Sur quel média veux-tu travailler ?**
