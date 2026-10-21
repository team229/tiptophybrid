#!/bin/bash
# Fetch every page of tiptophybrid.com through the r.jina.ai raw-HTML proxy.
#
# The origin refuses TCP connections from datacenter IPs, so r.jina.ai is used
# to render the pages and return their HTML.
#
#   usage: tools/fetch.sh [worker-count]
set -u
cd "$(dirname "$0")/.." || exit 1

WORKERS=${1:-5}
mkdir -p capture/raw capture/logs

# Split the URL list into one chunk per worker (POSIX split has no -n l/N).
awk -v n="$WORKERS" '{print > ("capture/part_" int((NR-1)/int((NR+n-1)/n)))}' capture/all_urls.txt

run_worker() {
  local part=$1
  local id
  id=$(basename "$part")
  while IFS= read -r url; do
    slug=$(echo "$url" | sed -E 's#https?://(www\.)?tiptophybrid\.com/?##; s#^$#home#; s#/$##; s#/#__#g')
    [ -z "$slug" ] && slug="home"
    out="capture/raw/${slug}.html"
    [ -s "$out" ] && continue
    for attempt in 1 2 3 4 5 6 7 8; do
      code=$(curl -s --max-time 150 -H "X-Return-Format: html" \
        "https://r.jina.ai/${url}" -o "$out.tmp" -w "%{http_code}")
      sz=$(wc -c < "$out.tmp" 2>/dev/null || echo 0)
      if [ "$code" = "200" ] && [ "$sz" -gt 2000 ]; then
        mv "$out.tmp" "$out"
        echo "OK $slug ($sz)" >> "capture/logs/$id.log"
        break
      fi
      rm -f "$out.tmp"
      sleep $((attempt * 5))
    done
    [ -s "$out" ] || echo "FAIL $url" >> "capture/logs/$id.log"
    sleep 2
  done < "$part"
  echo "WORKER $id DONE" >> "capture/logs/$id.log"
}

for p in capture/part_*; do run_worker "$p" & done
wait
rm -f capture/part_*
echo "ALL DONE"
