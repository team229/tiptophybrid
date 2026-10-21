/**
 * Capture the original <head> verbatim so the replica ships byte-identical
 * meta tags, tracking snippets and structured data.
 */
const fs = require('fs');
const path = require('path');

const ROOT = '/Users/abhay/tipto-clone';
const OUT = path.join(ROOT, 'app/src/data');
fs.mkdirSync(OUT, { recursive: true });

const html = fs.readFileSync(path.join(ROOT, 'capture/home-root.html'), 'utf8');
const head = html.slice(html.indexOf('<head'), html.indexOf('</head>'));

const grab = (re) => {
  const m = head.match(re);
  return m ? m[0] : null;
};

// Collect every <script> tag in the document and bucket it by its src / inline body.
const scriptTags = [];
const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
let s;
while ((s = scriptRe.exec(html)) !== null) {
  const attrs = s[1];
  const body = s[2];
  const src = (attrs.match(/src="([^"]+)"/) || [])[1] || null;
  scriptTags.push({ attrs: attrs.trim(), src, body, full: s[0] });
}

const bySrc = (needle) => scriptTags.find((t) => t.src && t.src.includes(needle))?.full ?? null;
const bySrcAnd = (a, b) =>
  scriptTags.find((t) => t.src && t.src.includes(a) && t.src.includes(b))?.full ?? null;

const snippets = {
  // Google Tag Manager (async loader + inline bootstrap)
  gtmAsync: bySrc('googletagmanager.com/gtm.js'),
  gtmInline:
    scriptTags.find((t) => !t.src && t.body.includes('GTM-KF7BFWB9'))?.full ?? null,
  // GA4
  ga4Loader: bySrcAnd('gtag/js', 'G-6L0VTXRB3V'),
  ga4Inline:
    scriptTags.find((t) => !t.src && t.body.includes("gtag('config', 'G-6L0VTXRB3V')"))?.full ?? null,
  // Google Ads
  adsLoader: bySrcAnd('gtag/js', 'AW-16632046138'),
  adsInline:
    scriptTags.find((t) => !t.src && t.body.includes("gtag('config', 'AW-16632046138')"))?.full ?? null,
  // Microsoft Clarity
  clarityLoader: bySrc('scripts.clarity.ms'),
  clarityTag: bySrcAnd('clarity.ms/tag', 'vmbm134riy'),
  clarityTagGtm: bySrcAnd('clarity.ms/tag', 'ref=gtm'),
  // Call tracking (Google Ads call tracking)
  callTracking: bySrc('call-tracking'),
  // Google Website Call / measurement loader
  wcmLoader: bySrc('gstatic.com/wcm/loader.js'),
  // Wordfence human-traffic logger
  wordfence:
    scriptTags.find((t) => !t.src && t.body.includes('wordfence_lh'))?.full ?? null,
  // Gravity Forms runtime
  gform: scriptTags.find((t) => !t.src && t.body.includes('var gform;'))?.full ?? null,
  // jQuery inline glue
  jqueryAfter: scriptTags.find((t) => t.attrs.includes('jquery-js-after'))?.full ?? null,
};

// External stylesheets, in original order.
const stylesheets = [];
const linkRe = /<link[^>]+rel="stylesheet"[^>]*>/g;
let m;
while ((m = linkRe.exec(head)) !== null) {
  const href = (m[0].match(/href="([^"]+)"/) || [])[1];
  if (href) stylesheets.push({ href, tag: m[0] });
}

// Font preconnects + font stylesheets
const fontLinks = [];
const fontRe = /<link[^>]+(?:fonts\.googleapis\.com|fonts\.gstatic\.com)[^>]*>/g;
while ((m = fontRe.exec(head)) !== null) fontLinks.push(m[0]);

const out = { snippets, stylesheets, fontLinks };
fs.writeFileSync(path.join(OUT, 'head-parts.json'), JSON.stringify(out, null, 2));
console.log('snippets found:');
for (const [k, v] of Object.entries(snippets)) console.log(' ', k, v ? v.length : 'MISSING');
console.log('stylesheets:', stylesheets.length, 'fontLinks:', fontLinks.length);
