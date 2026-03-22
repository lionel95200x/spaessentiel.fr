---
name: generate-image
description: Transformer une image produit via fal.ai et remplacer dans le produit associé
allowed-tools: Bash
---

# generate-image

Demander à l'utilisateur : **quel MEDIA_ID ?** (utiliser `/get-image` pour lister)

Puis exécuter :

```bash
FAL_KEY="66d87be6-9798-4b72-928b-e88ffbfd0b90:1e69111cc6a347d4596934ec8a36a5a6" python3 - << 'EOF'
import subprocess, json, os, urllib.request

BASE_URL = "http://localhost:3000"
FAL_KEY = os.environ["FAL_KEY"]
MEDIA_ID = 49  # ← seule ligne à changer

# Auth
token = json.loads(subprocess.run([
    "curl", "-s", "-X", "POST", f"{BASE_URL}/api/users/login",
    "-H", "Content-Type: application/json",
    "-d", '{"email":"claudeadmin@gmail.com","password":"claudeadmin"}'
], capture_output=True, text=True).stdout)["token"]

# URL image source
media = json.loads(subprocess.run([
    "curl", "-s", f"{BASE_URL}/api/media/{MEDIA_ID}",
    "-H", f"Authorization: JWT {token}"
], capture_output=True, text=True).stdout)
image_url = media["url"]
print(f"Source : {image_url}")

# fal.ai → image transformée
fal_script = f"""
import {{ fal }} from "@fal-ai/client";
fal.config({{ credentials: "{FAL_KEY}" }});
const r = await fal.subscribe("fal-ai/flux-pro/kontext", {{
  input: {{
    prompt: "Premium spa product photo. White marble background, soft side light, minimalist editorial style. Keep the product identical.",
    image_url: "{image_url}"
  }}
}});
console.log(r.data.images[0].url);
"""
with open("/Users/lionelbueno/Documents/Projet/spaessentiel/_fal_tmp.mjs", "w") as f:
    f.write(fal_script)

generated_url = subprocess.run(
    ["node", "_fal_tmp.mjs"], capture_output=True, text=True,
    cwd="/Users/lionelbueno/Documents/Projet/spaessentiel"
).stdout.strip()
os.unlink("/Users/lionelbueno/Documents/Projet/spaessentiel/_fal_tmp.mjs")
print(f"Généré : {generated_url}")

# Upload nouveau média
urllib.request.urlretrieve(generated_url, "/tmp/fal_out.jpg")
new_id = json.loads(subprocess.run([
    "curl", "-s", "-X", "POST", f"{BASE_URL}/api/media",
    "-H", f"Authorization: JWT {token}",
    "-F", "file=@/tmp/fal_out.jpg;type=image/jpeg",
    "-F", '_payload={"alt":"[AI]"}'
], capture_output=True, text=True).stdout).get("doc", {}).get("id")
print(f"Nouveau média : ID:{new_id}")

# Trouver le produit et remplacer dans sa galerie
products = json.loads(subprocess.run([
    "curl", "-s", f"{BASE_URL}/api/products?limit=100&depth=1",
    "-H", f"Authorization: JWT {token}"
], capture_output=True, text=True).stdout).get("docs", [])

for p in products:
    if any(str((i.get("image") or {}).get("id") if isinstance(i, dict) else i) == str(MEDIA_ID) for i in p.get("gallery", [])):
        new_gallery = [{"image": new_id if str((i.get("image") or {}).get("id") if isinstance(i, dict) else i) == str(MEDIA_ID) else (i.get("image", {}).get("id") if isinstance(i, dict) else i)} for i in p["gallery"]]
        req = urllib.request.Request(
            f"{BASE_URL}/api/products/{p['id']}",
            data=json.dumps({"gallery": new_gallery}).encode(),
            headers={"Content-Type": "application/json", "Authorization": f"JWT {token}"},
            method="PATCH"
        )
        urllib.request.urlopen(req)
        print(f"✓ {p['title']} mis à jour")
EOF
```
