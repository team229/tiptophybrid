#!/bin/bash
# Retry the assets that failed during the first mirroring pass.
cd /Users/abhay/tipto-clone
PUB=app/public
mkdir -p "$PUB"

retry_img() {
  local url="$1"
  local path="${url#https://www.tiptophybrid.com}"
  local out="$PUB$path"
  [ -s "$out" ] && return 0
  mkdir -p "$(dirname "$out")"
  for a in 1 2 3; do
    code=$(curl -s --max-time 120 \
      "https://images.weserv.nl/?url=www.tiptophybrid.com${path}" \
      -o "$out.tmp" -w "%{http_code}")
    if [ "$code" = "200" ] && [ "$(wc -c < "$out.tmp")" -gt 500 ]; then
      mv "$out.tmp" "$out"; echo "IMG  $path"; return 0
    fi
    rm -f "$out.tmp"; sleep 3
  done
  echo "FAIL $path"
}

retry_text() {
  local url="$1"
  local path="${url#https://www.tiptophybrid.com}"
  local out="$PUB$path"
  [ -s "$out" ] && return 0
  mkdir -p "$(dirname "$out")"
  for a in 1 2 3 4 5; do
    code=$(curl -s --max-time 180 -H "X-Return-Format: text" \
      "https://r.jina.ai/${url}" -o "$out.tmp" -w "%{http_code}")
    if [ "$code" = "200" ] && [ "$(wc -c < "$out.tmp")" -gt 200 ]; then
      mv "$out.tmp" "$out"; echo "TEXT $path"; return 0
    fi
    rm -f "$out.tmp"; sleep $((a * 5))
  done
  echo "FAIL $path"
}

export -f retry_img retry_text
export PUB

FAILED=$(grep FAIL mirror.log | sed 's/^FAIL //' | sort -u)

echo "$FAILED" | grep -Ei '\.(jpg|jpeg|png|webp|gif|svg|ico)$' | while IFS= read -r p; do
  retry_img "https://www.tiptophybrid.com${p}"
  sleep 1
done

echo "$FAILED" | grep -Ei '\.(css|js)$' | while IFS= read -r p; do
  retry_text "https://www.tiptophybrid.com${p}"
  sleep 4
done

echo "RETRY DONE"
