#!/bin/bash
# Fetch the WordPress core + jQuery scripts from jsDelivr (the origin blocks
# direct downloads from this machine).
cd /Users/abhay/tipto-clone
PUB=app/public
WP="https://cdn.jsdelivr.net/gh/WordPress/WordPress@6.7.1"

get() {
  local url="$1" out="$PUB$2"
  [ -s "$out" ] && return 0
  mkdir -p "$(dirname "$out")"
  curl -sL --max-time 90 "$url" -o "$out.tmp" -w "%{http_code}"
  if [ "$(wc -c < "$out.tmp")" -gt 200 ]; then mv "$out.tmp" "$out"; echo "OK $2"; else rm -f "$out.tmp"; echo "FAIL $url"; fi
}

get "$WP/wp-includes/js/jquery/jquery.min.js"                        "/wp-includes/js/jquery/jquery.min.js"
get "https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"   "/wp-includes/js/jquery/jquery.min.js"
get "https://cdn.jsdelivr.net/npm/jquery-migrate@3.4.1/dist/jquery-migrate.min.js" "/wp-includes/js/jquery/jquery-migrate.min.js"
get "$WP/wp-includes/js/jquery/ui/core.min.js"                        "/wp-includes/js/jquery/ui/core.min.js"
get "$WP/wp-includes/js/dist/dom-ready.min.js"                        "/wp-includes/js/dist/dom-ready.min.js"
get "$WP/wp-includes/js/dist/hooks.min.js"                            "/wp-includes/js/dist/hooks.min.js"
get "$WP/wp-includes/js/dist/i18n.min.js"                             "/wp-includes/js/dist/i18n.min.js"
get "$WP/wp-includes/js/dist/a11y.min.js"                             "/wp-includes/js/dist/a11y.min.js"
get "$WP/wp-includes/js/comment-reply.min.js"                         "/wp-includes/js/comment-reply.min.js"
get "$WP/wp-includes/js/wp-emoji-loader.min.js"                       "/wp-includes/js/wp-emoji-loader.min.js"
get "$WP/wp-includes/js/wp-emoji-release.min.js"                      "/wp-includes/js/wp-emoji-release.min.js"
get "$WP/wp-includes/js/wp-emoji-loader.min.js"                       "/wp-includes/js/wp-emoji-loader.min.js"

echo "WP CORE DONE"
