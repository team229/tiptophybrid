#!/bin/bash
cd /Users/abhay/tipto-clone
PUB=app/public
export PUB
one() {
  local url="$1"
  local path="${url%%\?*}"; path="${path#https://www.tiptophybrid.com}"
  local out="$PUB$path"
  [ -s "$out" ] && return 0
  mkdir -p "$(dirname "$out")"
  for a in $(seq 1 25); do
    code=$(curl -s --max-time 180 -H "X-Return-Format: text" "https://r.jina.ai/${url}" -o "$out.tmp" -w "%{http_code}")
    sz=$(wc -c < "$out.tmp" 2>/dev/null || echo 0)
    if [ "$code" = "200" ] && [ "$sz" -gt 200 ] && ! grep -q "Checking the site connection security" "$out.tmp" 2>/dev/null; then
      mv "$out.tmp" "$out"; echo "OK $path"; return 0
    fi
    rm -f "$out.tmp"; sleep $((15 + a * 5))
  done
  echo "FAIL $url"
}
export -f one
cat capture/remaining-js.txt | xargs -P 2 -I{} bash -c 'one "$@"' _ {}
echo "REMAINING JS DONE"
