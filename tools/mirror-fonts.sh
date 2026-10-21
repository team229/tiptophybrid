#!/bin/bash
# Mirror the Google webfonts so the replica renders fully offline and the
# browser's font loading resolves (the live site pulls 36 Roboto/Roboto Slab
# faces, which keeps document.fonts.ready pending forever on a cold cache).
cd /Users/abhay/tipto-clone
PUB=app/public
FDIR="$PUB/wp-content/fonts"
mkdir -p "$FDIR"

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"

fetch_css() {
  local name="$1" url="$2"
  curl -s --max-time 60 -A "$UA" "$url" -o "/tmp/$name.css" -w "$name HTTP %{http_code} %{size_download}\n"
}

fetch_css "roboto"     "https://fonts.googleapis.com/css?family=Roboto:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&display=swap"
fetch_css "robotoslab" "https://fonts.googleapis.com/css?family=Roboto+Slab:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&display=swap"
fetch_css "poppins"    "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
fetch_css "poppinsfira" "https://fonts.googleapis.com/css?family=Poppins:400,400i,700,700i%7CFira+Sans:400,400i,700,700i&subset=latin,latin-ext&display=auto"

# Download every woff2 referenced by those stylesheets and rewrite the URLs.
node -e '
const fs=require("fs"), path=require("path"), https=require("https"), {execSync}=require("child_process");
const names=["roboto","robotoslab","poppins","poppinsfira"];
const dir="app/public/wp-content/fonts";
for(const n of names){
  let css=fs.readFileSync("/tmp/"+n+".css","utf8");
  const urls=[...new Set((css.match(/https:\/\/fonts\.gstatic\.com\/[^)\s]+/g)||[]))];
  urls.forEach((u,i)=>{
    const file="g-"+n+"-"+i+".woff2";
    try{ execSync(`curl -s --max-time 60 -o "${dir}/${file}" "${u}"`); }catch(e){}
    css=css.split(u).join("/wp-content/fonts/"+file);
  });
  fs.writeFileSync(dir+"/"+n+".css", css);
  console.log(n, "faces:", urls.length);
}
'

# Mirror lucide from unpkg so the icons work without a CDN.
mkdir -p "$PUB/vendor/lucide"
curl -s --max-time 60 "https://unpkg.com/lucide@0.545.0/dist/umd/lucide.js" -o "$PUB/vendor/lucide/lucide.js" -w "lucide HTTP %{http_code} %{size_download}\n"

echo "FONTS DONE"
