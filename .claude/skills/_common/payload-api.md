# Payload API — Snippets GET réutilisables

> Pattern d'exécution dans `auth.md` (toujours Python subprocess, un seul appel Bash)

---

## GET collection (liste)

```python
result = subprocess.run([
    "curl", "-s", f"{BASE_URL}/api/{collection}?limit=100&depth=0",
    "-H", f"Authorization: JWT {token}"
], capture_output=True, text=True)
data = json.loads(result.stdout)
```

## GET par ID

```python
result = subprocess.run([
    "curl", "-s", f"{BASE_URL}/api/{collection}/{id}?depth=1",
    "-H", f"Authorization: JWT {token}"
], capture_output=True, text=True)
doc = json.loads(result.stdout)
```

## GET par slug

```python
result = subprocess.run([
    "curl", "-s", f"{BASE_URL}/api/{collection}?where[slug][equals]={slug}&depth=1",
    "-H", f"Authorization: JWT {token}"
], capture_output=True, text=True)
data = json.loads(result.stdout)
```

## Afficher les docs

```python
for doc in data.get("docs", []):
    print(f"ID:{doc.get('id')} | slug:/{doc.get('slug','?')} | status:{doc.get('_status','?')} | {doc.get('title','(sans titre)')}")
print(f"\nTotal: {data.get('totalDocs', 0)} docs")
```
