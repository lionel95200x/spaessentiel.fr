# CRUD Collection — Scripts génériques Payload

> Auth dans `auth.md`. Toujours un seul appel Bash via Python subprocess.

---

## LIST

```python
COLLECTION = "pages"  # ← seule ligne à changer

result = subprocess.run([
    "curl", "-s", f"{BASE_URL}/api/{COLLECTION}?limit=100&depth=0",
    "-H", f"Authorization: JWT {token}"
], capture_output=True, text=True)

data = json.loads(result.stdout)
for doc in data.get("docs", []):
    label = doc.get("title") or doc.get("name") or "(sans titre)"
    print(f"ID:{doc.get('id')} | slug:/{doc.get('slug','?')} | status:{doc.get('_status','?')} | {label}")
print(f"\nTotal: {data.get('totalDocs', 0)} {COLLECTION}")
```

## PUBLISH

```python
COLLECTION = "pages"  # ← seule ligne à changer
DOC_ID = 6

result = subprocess.run([
    "curl", "-s", "-X", "PATCH", f"{BASE_URL}/api/{COLLECTION}/{DOC_ID}?draft=false",
    "-H", f"Authorization: JWT {token}",
    "-H", "Content-Type: application/json",
    "-d", '{"_status":"published"}'
], capture_output=True, text=True)

doc = json.loads(result.stdout).get("doc", {})
print(f"✓ {doc.get('_status')} | ID:{doc.get('id')} | {doc.get('title') or doc.get('name','?')}")
```

> Wrapper ces snippets dans le pattern login de `auth.md`.
