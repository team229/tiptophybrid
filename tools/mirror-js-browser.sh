#!/bin/bash
# The WordPress WAF challenges plain fetches of the theme's JavaScript, but the
# reader's browser engine occasionally gets through. Retry until it does and
# strip the reader's markdown wrapper to recover the raw source.
cd /Users/abhay/tipto-clone
PUB=app/public
export PUB

one() {
  local url="$1"
  local path="${url%%\?*}"; path="${path#https://www.tiptophybrid.com}"
  local out="$PUB$path"
  [ -s "$out" ] && return 0
  mkdir -p "$(dirname "$out")"
  for a in $(seq 1 40); do
    curl -s --max-time 180 -H "X-Engine: browser" "https://r.jina.ai/${url}" -o /tmp/raw.txt
    sz=$(wc -c < /tmp/raw.txt 2>/dev/null || echo 0)
    if [ "$sz" -gt 3000 ] && ! grep -qi "Robot Challenge\|Checking the site connection security" /tmp/raw.txt; then
      node -e '
        const fs=require("fs");
        let t=fs.readFileSync("/tmp/raw.txt","utf8");
        const i=t.indexOf("Markdown Content:");
        if(i>=0) t=t.slice(i+"Markdown Content:".length);
        t=t.replace(/^\s+/,"");
        fs.writeFileSync(process.argv[1], t);
      ' "$out.tmp"
      sz=$(wc -c < "$out.tmp" 2>/dev/null || echo 0)
      if [ "$sz" -gt 500 ]; then mv "$out.tmp" "$out"; echo "OK $path ($sz)"; return 0; fi
    fi
    rm -f "$out.tmp"
    sleep $((10 + (a % 7) * 5))
  done
  echo "FAIL $url"
}
export -f one

cat capture/remaining-js.txt | xargs -P 5 -I{} bash -c 'one "$@"' _ {}
echo "BROWSER JS DONE"
