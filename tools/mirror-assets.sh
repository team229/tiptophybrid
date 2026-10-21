#!/bin/bash
# Mirror every asset that lives on www.tiptophybrid.com into app/public so the
# replica is fully self-hosted. Images go through images.weserv.nl, CSS/JS
# through r.jina.ai (the origin itself blocks this machine).
cd /Users/abhay/tipto-clone
PUB=app/public
mkdir -p "$PUB"

mirror_img() {
  local url="$1"
  local path="${url#https://www.tiptophybrid.com}"
  local out="$PUB$path"
  [ -s "$out" ] && return 0
  mkdir -p "$(dirname "$out")"
  local code
  code=$(curl -s --max-time 120 \
    "https://images.weserv.nl/?url=www.tiptophybrid.com${path}&output=jpg&q=90&we=1" \
    -o "$out.tmp" -w "%{http_code}")
  if [ "$code" = "200" ] && [ "$(wc -c < "$out.tmp")" -gt 500 ]; then
    mv "$out.tmp" "$out"
    echo "IMG  $path"
  else
    # retry as png passthrough
    rm -f "$out.tmp"
    code=$(curl -s --max-time 120 \
      "https://images.weserv.nl/?url=www.tiptophybrid.com${path}" \
      -o "$out.tmp" -w "%{http_code}")
    if [ "$code" = "200" ] && [ "$(wc -c < "$out.tmp")" -gt 500 ]; then
      mv "$out.tmp" "$out"
      echo "IMG  $path"
    else
      rm -f "$out.tmp"
      echo "FAIL $path"
    fi
  fi
}

mirror_text() {
  local url="$1"
  local path="${url#https://www.tiptophybrid.com}"
  local out="$PUB$path"
  [ -s "$out" ] && return 0
  mkdir -p "$(dirname "$out")"
  local code
  code=$(curl -s --max-time 150 -H "X-Return-Format: text" \
    "https://r.jina.ai/${url}" -o "$out.tmp" -w "%{http_code}")
  if [ "$code" = "200" ] && [ "$(wc -c < "$out.tmp")" -gt 200 ]; then
    mv "$out.tmp" "$out"
    echo "TEXT $path"
  else
    rm -f "$out.tmp"
    echo "FAIL $path"
  fi
}

export -f mirror_img mirror_text
export PUB

# Build the asset list
node -e '
const fs=require("fs");
const files=fs.readdirSync("raw").filter(f=>f.endsWith(".html"));
const assets=new Set();
for(const f of files){
  const h=fs.readFileSync("raw/"+f,"utf8");
  (h.match(/https:\/\/www\.tiptophybrid\.com\/wp-content\/uploads\/[^"'"'"')\s\\]+\.(jpg|jpeg|png|webp|gif|svg|ico)/gi)||[]).forEach(u=>assets.add(u));
  (h.match(/https:\/\/www\.tiptophybrid\.com\/[^"'"'"')\s\\]+\.(css|js)/gi)||[]).forEach(u=>assets.add(u.split("?")[0]));
}
fs.writeFileSync("capture/asset-list.txt",[...assets].sort().join("\n"));
console.log("assets:",assets.size);
'

echo "--- images:"
grep -Ei '\.(jpg|jpeg|png|webp|gif|svg|ico)$' capture/asset-list.txt | xargs -P 8 -I{} bash -c 'mirror_img "$@"' _ {}
echo "--- css/js:"
grep -Ei '\.(css|js)$' capture/asset-list.txt | xargs -P 4 -I{} bash -c 'mirror_text "$@"' _ {}
echo "MIRROR DONE"
