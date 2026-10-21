#!/bin/bash
# Fetch the assets whose filenames contain a zero-width space (U+200B) —
# they need proper percent-encoding before the proxy will serve them.
cd /Users/abhay/tipto-clone
PUB=app/public
mkdir -p "$PUB"

node -e '
const fs=require("fs");
const list=fs.readFileSync("capture/asset-list.txt","utf8").split("\n")
  .filter(l=>l && /\.(png|jpg|jpeg|webp)$/i.test(l));
fs.writeFileSync("zw-list.txt", list.join("\n"));
console.log("image assets:", list.length);
'

while IFS= read -r url; do
  [ -z "$url" ] && continue
  path="${url#https://www.tiptophybrid.com}"
  out="$PUB$path"
  [ -s "$out" ] && { echo "SKIP $path"; continue; }
  mkdir -p "$(dirname "$out")"
  code=$(curl -s --max-time 120 -G --data-urlencode "url=www.tiptophybrid.com${path}" \
    "https://images.weserv.nl/" -o "$out.tmp" -w "%{http_code}")
  if [ "$code" = "200" ] && [ "$(wc -c < "$out.tmp")" -gt 500 ]; then
    mv "$out.tmp" "$out"; echo "IMG  $path"
  else
    rm -f "$out.tmp"; echo "FAIL $path"
  fi
  sleep 1
done < zw-list.txt

echo "ZW DONE"
