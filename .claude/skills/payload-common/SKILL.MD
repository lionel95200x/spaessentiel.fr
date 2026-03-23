# payload-common — Utilitaires partagés Payload CMS

Librairie commune pour tous les skills qui interagissent avec Payload CMS.

---

## Credentials & BASE_URL

```
BASE_URL: http://localhost:3008
email:    claudeadmin@gmail.com
password: claudeadmin
```

---

## Pattern de base — Login + appel API

Toujours dans un **seul appel Bash** via Python inline :

```bash
python3 - << 'EOF'
import subprocess, json

BASE_URL = "http://localhost:3008"

login = subprocess.run([
    "curl", "-s", "-X", "POST", f"{BASE_URL}/api/users/login",
    "-H", "Content-Type: application/json",
    "-d", '{"email":"claudeadmin@gmail.com","password":"claudeadmin"}'
], capture_output=True, text=True)

token = json.loads(login.stdout)["token"]

# Suite des appels API avec token...
EOF
```

---

## LIST — Lister une collection

```python
COLLECTION = "pages"  # ← changer selon le besoin

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

---

## PATCH — Mettre à jour un document

```python
COLLECTION = "pages"  # ← changer
DOC_ID = 6            # ← changer

result = subprocess.run([
    "curl", "-s", "-X", "PATCH", f"{BASE_URL}/api/{COLLECTION}/{DOC_ID}",
    "-H", f"Authorization: JWT {token}",
    "-H", "Content-Type: application/json",
    "-d", json.dumps({ ...champs à modifier... })
], capture_output=True, text=True)

doc = json.loads(result.stdout).get("doc", {})
print(f"✓ ID:{doc.get('id')} | {doc.get('title') or doc.get('name','?')}")
```

---

## PUBLISH — Publier un document

```python
COLLECTION = "pages"
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

---

## GET par slug

```python
result = subprocess.run([
    "curl", "-s", f"{BASE_URL}/api/{COLLECTION}?where[slug][equals]={slug}&depth=1",
    "-H", f"Authorization: JWT {token}"
], capture_output=True, text=True)
data = json.loads(result.stdout)
```

---

## Upload image → récupérer l'ID media

```bash
curl -sL "$IMAGE_URL" -o /tmp/upload.jpg

MEDIA_ID=$(curl -s -X POST "http://localhost:3008/api/media" \
  -H "Authorization: JWT $TOKEN" \
  -F "file=@/tmp/upload.jpg;type=image/jpeg" \
  -F '_payload={"alt":"Description de l image"}' \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['doc']['id'])")
echo "MEDIA_ID: $MEDIA_ID"
```

---

## Lexical richText — Format Payload

```python
def txt(text):
    return {"type":"text","text":text,"format":0,"detail":0,"mode":"normal","style":"","version":1}
def para(text):
    return {"type":"paragraph","format":"","indent":0,"version":1,"children":[txt(text)],"direction":"ltr"}
def h2(text):
    return {"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[txt(text)],"direction":"ltr"}

richtext = {
    "root": {
        "type":"root","format":"","indent":0,"version":1,"direction":"ltr",
        "children": [ h2("Titre"), para("Paragraphe") ]
    }
}
```
