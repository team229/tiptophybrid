#!/bin/bash
# Parallel re-mirror for the CSS/JS that did not make it through yet.
cd /Users/abhay/tipto-clone
PUB=app/public
export PUB

one() {
  local url="$1"
  local base="${url%%\?*}"
  local path="${base#https://www.tiptophybrid.com}"
  local out="$PUB$path"
  [ -s "$out" ] && { echo "SKIP $path"; return 0; }
  mkdir -p "$(dirname "$out")"
  for a in 1 2 3 4 5 6 7 8; do
    code=$(curl -s --max-time 180 -H "X-Return-Format: text" "https://r.jina.ai/${url}" -o "$out.tmp" -w "%{http_code}")
    sz=$(wc -c < "$out.tmp" 2>/dev/null || echo 0)
    if [ "$code" = "200" ] && [ "$sz" -gt 200 ] && ! grep -q "Checking the site connection security" "$out.tmp" 2>/dev/null; then
      mv "$out.tmp" "$out"; echo "OK $path"; return 0
    fi
    rm -f "$out.tmp"
    sleep $((a * 4))
  done
  echo "FAIL $url"
}
export -f one

cat capture/cssjs-urls.txt | xargs -P 5 -I{} bash -c 'one "$@"' _ {}
echo "PAR CSSJS DONE"
