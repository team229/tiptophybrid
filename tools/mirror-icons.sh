#!/bin/bash
# Mirror the icon fonts referenced by the Elementor / Font Awesome / Gravity
# Forms stylesheets (relative URLs -> resolved against the original origin).
cd /Users/abhay/tipto-clone
PUB=app/public
BASE="https://www.tiptophybrid.com/wp-content/plugins"

fetch() {
  local url="$1" out="$PUB$2"
  [ -s "$out" ] && return 0
  mkdir -p "$(dirname "$out")"
  for a in 1 2 3 4 5; do
    code=$(curl -s --max-time 120 -H "X-Return-Format: text" "https://r.jina.ai/${url}" -o "$out.tmp" -w "%{http_code}")
    sz=$(wc -c < "$out.tmp" 2>/dev/null || echo 0)
    if [ "$code" = "200" ] && [ "$sz" -gt 200 ]; then
      mv "$out.tmp" "$out"; echo "OK $2"; return 0
    fi
    rm -f "$out.tmp"; sleep $((a * 5))
  done
  echo "FAIL $url"
}

for f in eicons.woff2 eicons.woff eicons.ttf eicons.eot eicons.svg; do
  fetch "$BASE/elementor/assets/lib/eicons/fonts/$f" "/wp-content/plugins/elementor/assets/lib/eicons/fonts/$f"
done
for f in fa-brands-400.woff2 fa-brands-400.woff fa-brands-400.ttf fa-brands-400.eot fa-solid-900.woff2 fa-solid-900.woff fa-solid-900.ttf fa-solid-900.eot; do
  fetch "$BASE/elementor/assets/lib/font-awesome/webfonts/$f" "/wp-content/plugins/elementor/assets/lib/font-awesome/webfonts/$f"
done
for f in gf-creditcards.svg gf-creditcards-check.svg; do
  fetch "$BASE/gravityforms/images/$f" "/wp-content/plugins/gravityforms/images/$f"
done
fetch "$BASE/gravityforms/css/chosen-sprite.png" "/wp-content/plugins/gravityforms/css/chosen-sprite.png"

echo "ICONS DONE"
