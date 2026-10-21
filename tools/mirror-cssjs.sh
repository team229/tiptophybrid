#!/bin/bash
# Mirror the remaining CSS/JS. The exact original URLs (with their ?ver= query
# strings) are used because they are cached differently upstream.
cd /Users/abhay/tipto-clone
PUB=app/public

node -e '
const fs=require("fs");
const files=fs.readdirSync("raw").filter(f=>f.endsWith(".html"));
const urls=new Set();
for(const f of files){
  const h=fs.readFileSync("raw/"+f,"utf8");
  (h.match(/<link[^>]+rel="stylesheet"[^>]*>/g)||[]).forEach(l=>{
    const m=l.match(/href="([^"]+)"/); if(m && m[1].includes("tiptophybrid.com")) urls.add(m[1]);
  });
  (h.match(/<script[^>]+src="([^"]+)"/g)||[]).forEach(s=>{
    const m=s.match(/src="([^"]+)"/); if(m && m[1].includes("tiptophybrid.com")) urls.add(m[1]);
  });
}
fs.writeFileSync("capture/cssjs-urls.txt",[...urls].sort().join("\n"));
console.log("css/js urls:",urls.size);
'

while IFS= read -r url; do
  [ -z "$url" ] && continue
  base="${url%%\?*}"
  path="${base#https://www.tiptophybrid.com}"
  out="$PUB$path"
  [ -s "$out" ] && continue
  mkdir -p "$(dirname "$out")"
  for a in 1 2 3 4 5; do
    code=$(curl -s --max-time 180 -H "X-Return-Format: text" "https://r.jina.ai/${url}" -o "$out.tmp" -w "%{http_code}")
    sz=$(wc -c < "$out.tmp" 2>/dev/null || echo 0)
    if [ "$code" = "200" ] && [ "$sz" -gt 200 ] && ! grep -q "Checking the site connection security" "$out.tmp"; then
      mv "$out.tmp" "$out"; echo "OK $path"; break
    fi
    rm -f "$out.tmp"; sleep $((a * 7))
  done
  [ -s "$out" ] || echo "FAIL $url"
  sleep 3
done < capture/cssjs-urls.txt

echo "CSSJS DONE"
