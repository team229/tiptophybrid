#!/bin/bash
cd /Users/abhay/tipto-clone
PUB=app/public
while IFS= read -r url; do
  [ -z "$url" ] && continue
  path="${url#https://www.tiptophybrid.com}"
  out="$PUB$path"
  [ -s "$out" ] && continue
  mkdir -p "$(dirname "$out")"
  for a in 1 2 3 4 5 6; do
    code=$(curl -s --max-time 180 -H "X-Return-Format: text" "https://r.jina.ai/${url}" -o "$out.tmp" -w "%{http_code}")
    if [ "$code" = "200" ] && [ "$(wc -c < "$out.tmp")" -gt 200 ]; then
      mv "$out.tmp" "$out"; echo "OK $path"; break
    fi
    rm -f "$out.tmp"; sleep $((a * 10))
  done
  [ -s "$out" ] || echo "FAIL $path"
  sleep 8
done < capture/css-list.txt
echo "CSS RETRY DONE"
