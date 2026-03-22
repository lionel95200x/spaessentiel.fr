# Auth Payload CMS — Credentials partagés

```
BASE_URL: http://localhost:3000
email:    claudeadmin@gmail.com
password: claudeadmin
role:     admin
```

---

## Login + appel API — Pattern à utiliser

Toujours dans un **seul appel Bash** via un script Python inline :

```bash
python3 - << 'EOF'
import subprocess, json

BASE_URL = "http://localhost:3022"

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

## Upload image → récupérer l'ID media

```bash
# Télécharger une image depuis une URL
curl -sL "$IMAGE_URL" -o /tmp/upload.jpg

# Uploader vers Payload
MEDIA_ID=$(curl -s -X POST "http://localhost:3022/api/media" \
  -H "Authorization: JWT $TOKEN" \
  -F "file=@/tmp/upload.jpg;type=image/jpeg" \
  -F '_payload={"alt":"Description de l image"}' \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['doc']['id'])")
echo "MEDIA_ID: $MEDIA_ID"
```

---

## PATCH générique

```bash
curl -s -X PATCH "http://localhost:3022/api/{collection}/{id}" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

---

## Lexical richText — Format Payload

Utiliser **python3 urllib** (pas curl -d @file) pour éviter les bugs d'encodage UTF-8.

```python
import json, urllib.request

def txt(text):
    return {"type":"text","text":text,"format":0,"detail":0,"mode":"normal","style":"","version":1}
def para(text):
    return {"type":"paragraph","format":"","indent":0,"version":1,"children":[txt(text)],"direction":"ltr"}
def h2(text):
    return {"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[txt(text)],"direction":"ltr"}

richtext = {
    "root": {
        "type":"root","format":"","indent":0,"version":1,"direction":"ltr",
        "children": [
            h2("Mon titre"),
            para("Mon paragraphe"),
        ]
    }
}

payload = json.dumps({"description": richtext}).encode("utf-8")
req = urllib.request.Request(
    "http://localhost:3022/api/products/ID",
    data=payload,
    headers={"Content-Type":"application/json","Authorization":f"JWT {TOKEN}"},
    method="PATCH"
)
with urllib.request.urlopen(req) as resp:
    print(json.loads(resp.read()).get("doc", {}).get("id"))
```
