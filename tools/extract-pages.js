/**
 * Extract structured data (SEO + content) from the captured original pages.
 * Output: src/data/pages.json  +  src/content/ HTML fragments
 */
const fs = require('fs');
const path = require('path');

const ROOT = '/Users/abhay/tipto-clone';
const RAW = path.join(ROOT, 'capture/raw');
const OUT = path.join(ROOT, 'app/src/data');
const FRAG = path.join(ROOT, 'app/src/content');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(FRAG, { recursive: true });

const ORIGIN = 'https://www.tiptophybrid.com';

function innerHead(html) {
  const m = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  return m ? m[1] : '';
}
function bodyOf(html) {
  const bi = html.search(/<body[\s>]/);
  return bi >= 0 ? html.slice(html.indexOf('>', bi) + 1) : html;
}
function decode(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&nbsp;/g, '\u00a0')
    .replace(/&#8217;/g, '\u2019').replace(/&#8211;/g, '\u2013').replace(/&#038;/g, '&');
}
function metaTag(html, attrName, attrValue) {
  const re = new RegExp(
    `<meta[^>]*\\b${attrName}=["']${attrValue}["'][^>]*>`,
    'i',
  );
  const m = html.match(re);
  if (!m) return '';
  const c = m[0].match(/content=["']([^"']*)["']/i);
  return c ? decode(c[1]) : '';
}
function linkAttr(html, rel) {
  const m = html.match(new RegExp(`<link[^>]*rel=["']${rel}["'][^>]*>`, 'i'));
  if (!m) return '';
  const h = m[0].match(/href=["']([^"']*)["']/i);
  return h ? decode(h[1]) : '';
}
/** Every <link> in the head, preserved verbatim. */
function headLinks(html) {
  return (html.match(/<link\b[^>]*>/gi) || []).map((l) =>
    l.replace(/https:\/\/www\.tiptophybrid\.com/g, ''),
  );
}

/** Rewrite internal absolute URLs -> root-relative so the replica is self-contained.
 *  The `__ASSET_BASE__` token is swapped at build time (see BaseLayout / pages). */
function localize(html) {
  return html.replace(
    new RegExp(`https?://(?:www\\.)?tiptophybrid\\.com`, 'g'),
    '__ASSET_BASE__',
  );
}

/** Extract inner HTML of an Elementor "html.default" widget (service / location pages).
 *  `from` limits the search so the shared header widget is never picked up. */
function extractElementorHtml(body, from = 0) {
  const idx = body.indexOf('data-widget_type="html.default"', from);
  if (idx === -1) return null;
  const open = body.lastIndexOf('<div', idx);
  let depth = 0, i = open;
  const tagRe = /<(\/?)div\b[^>]*>/g;
  tagRe.lastIndex = open;
  let m;
  while ((m = tagRe.exec(body)) !== null) {
    if (m[1] === '/') { depth--; if (depth === 0) { i = m.index; break; } }
    else depth++;
  }
  const start = body.indexOf('>', open) + 1;
  return body.slice(start, i);
}

/** Extract the `cs-content` block (Pro theme page builder). */
function extractCsContent(body) {
  const m = body.match(/<div id="cs-content" class="cs-content">([\s\S]*?)<\/div>\s*<\/div>\s*<\/article>/i);
  if (m) return m[1];
  const i = body.indexOf('<div id="cs-content" class="cs-content">');
  if (i === -1) return null;
  const start = i + '<div id="cs-content" class="cs-content">'.length;
  // walk to matching close
  let depth = 1, j = start;
  const tagRe = /<(\/?)div\b[^>]*>/g;
  tagRe.lastIndex = start;
  let m2;
  while ((m2 = tagRe.exec(body)) !== null) {
    depth += m2[1] === '/' ? -1 : 1;
    if (depth === 0) { j = m2.index; break; }
  }
  return body.slice(start, j);
}

/** Extract the region between an opening tag and its matching close tag. */
function extractRegion(body, openNeedle) {
  const i = body.indexOf(openNeedle);
  if (i === -1) return null;
  const start = body.indexOf('>', i) + 1;
  let depth = 1, j = start;
  const tagRe = /<(\/?)div\b[^>]*>/g;
  tagRe.lastIndex = start;
  let m;
  while ((m = tagRe.exec(body)) !== null) {
    depth += m[1] === '/' ? -1 : 1;
    if (depth === 0) { j = m.index; break; }
  }
  return body.slice(start, j);
}

/** Extract the WP entry-content for classic blog posts. */
function extractEntryContent(body) {
  const i = body.indexOf('class="entry-content content"');
  if (i === -1) return null;
  const start = body.indexOf('>', i) + 1;
  let depth = 1, j = start;
  const tagRe = /<(\/?)div\b[^>]*>/g;
  tagRe.lastIndex = start;
  let m;
  while ((m = tagRe.exec(body)) !== null) {
    depth += m[1] === '/' ? -1 : 1;
    if (depth === 0) { j = m.index; break; }
  }
  return body.slice(start, j);
}

const files = fs.readdirSync(RAW).filter(f => f.endsWith('.html'));
const pages = [];

for (const f of files) {
  const html = fs.readFileSync(path.join(RAW, f), 'utf8');
  const head = innerHead(html);
  const body = bodyOf(html);
  const slug = f.replace(/\.html$/, '');

  // ---- SEO / meta -------------------------------------------------------
  const titleM = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const seo = {
    title: titleM ? decode(titleM[1]) : '',
    description: metaTag(head, 'name', 'description'),
    robots: metaTag(head, 'name', 'robots'),
    ogLocale: metaTag(head, 'property', 'og:locale'),
    ogType: metaTag(head, 'property', 'og:type'),
    ogTitle: metaTag(head, 'property', 'og:title'),
    ogDescription: metaTag(head, 'property', 'og:description'),
    ogUrl: metaTag(head, 'property', 'og:url'),
    ogSiteName: metaTag(head, 'property', 'og:site_name'),
    ogImage: metaTag(head, 'property', 'og:image'),
    twitterCard: metaTag(head, 'name', 'twitter:card'),
    twitterTitle: metaTag(head, 'name', 'twitter:title'),
    twitterDescription: metaTag(head, 'name', 'twitter:description'),
    twitterImage: metaTag(head, 'name', 'twitter:image'),
    canonical: linkAttr(head, 'canonical'),
    next: linkAttr(head, 'next'),
    prev: linkAttr(head, 'prev'),
    modified: metaTag(head, 'property', 'article:modified_time'),
    published: metaTag(head, 'property', 'article:published_time'),
    generator: metaTag(head, 'name', 'generator'),
    tileImage: metaTag(head, 'name', 'msapplication-TileImage'),
    links: headLinks(head),
  };

  // ---- JSON-LD ----------------------------------------------------------
  const jsonld = [];
  const jsonldRaw = [];
  const ldRe = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let lm;
  while ((lm = ldRe.exec(head)) !== null) {
    const raw = lm[1].trim();
    jsonldRaw.push(raw);
    try {
      jsonld.push(JSON.parse(raw));
    } catch (e) {
      jsonld.push(raw);
    }
  }

  // ---- body classes -----------------------------------------------------
  // jina's DOM serialisation drops the outer <body> attributes, so the theme
  // classes are rebuilt from the page type (the only place they are used by
  // the stylesheet is `.blog.x-post-meta-disabled`).
  const THEME_CLASSES =
    'wp-theme-pro ehf-header ehf-template-pro ehf-stylesheet-pro x-integrity x-integrity-light ' +
    'x-full-width-layout-active x-full-width-active x-post-meta-disabled elementor-default ' +
    'elementor-kit-317 x-navbar-static-active pro-v6_6_6 e--ua-blink e--ua-chrome e--ua-webkit';

  let bodyClass = '';

  // ---- content ----------------------------------------------------------
  let template = 'unknown';
  let content = null;
  // Prefer the Elementor *page* container (not the shared header template).
  const wpPageIdx = body.indexOf('data-elementor-type="wp-page"');
  const headerEnd = body.lastIndexOf('</header>');
  const mainFrom = wpPageIdx >= 0 ? wpPageIdx : headerEnd >= 0 ? headerEnd : 0;
  const elemHtml = extractElementorHtml(body, mainFrom);
  const cs = extractCsContent(body);
  const entry = extractEntryContent(body);
  const archive = extractRegion(body, '<div class="x-container max width offset">');
  if (cs && cs.length > 500) {
    template = 'cs-content';
    content = cs;
  } else if (elemHtml && elemHtml.length > 500) {
    template = 'elementor-html';
    content = elemHtml;
  } else if (archive && archive.length > 500) {
    // The blog index lists many posts; a single post page holds exactly one article.
    const articles = (archive.match(/<article\b/g) || []).length;
    template = articles > 1 ? 'blog-archive' : 'entry-content';
    content = archive;
  } else if (entry && entry.length > 300) {
    template = 'entry-content';
    content = entry;
  }

  // strip a nested <html>/<head>/<body> wrapper that some Elementor widgets include
  if (template === 'elementor-html') {
    const m = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (m) content = m[1];
    content = content.replace(/<head[\s\S]*?<\/head>/i, '');
    content = content.replace(/<html[^>]*>/i, '').replace(/<\/html>/i, '');
  }

  const images = [...new Set((content || '').match(/https:\/\/www\.tiptophybrid\.com\/wp-content\/uploads\/[^"')\s\\]+/g) || [])];

  const slugPath = slug === 'home' ? '/' : '/' + slug + '/';
  const fragName = (slug === 'home' ? 'home' : slug) + '.html';
  if (content) {
    fs.writeFileSync(path.join(FRAG, fragName), localize(content));
  }

  // ---- body classes (built once the page type is known) ------------------
  const articleM = (content || '').match(/<article id="post-(\d+)" class="([^"]*)"/);
  if (template === 'entry-content' && articleM) {
    const cats = (articleM[2].match(/category-[\w-]+/g) || []).join(' ');
    bodyClass =
      `wp-singular single single-post postid-${articleM[1]} post-${slug} ${cats} ${THEME_CLASSES}`;
  } else if (template === 'blog-archive') {
    bodyClass = `home blog ${THEME_CLASSES}`;
  } else {
    bodyClass =
      `wp-singular page-template page-template-template-blank-4 page-template-template-blank-4-php ` +
      `page page-id-${articleM ? articleM[1] : slug} ${THEME_CLASSES}`;
  }
  if (slug === 'home') {
    // Ground truth captured from the live document.
    bodyClass =
      'home wp-singular page-template page-template-template-blank-4 page-template-template-blank-4-php ' +
      'page page-id-50 wp-theme-pro ehf-header ehf-template-pro ehf-stylesheet-pro x-integrity ' +
      'x-integrity-light x-full-width-layout-active x-full-width-active x-post-meta-disabled ' +
      'elementor-default elementor-kit-317 x-navbar-static-active pro-v6_6_6 e--ua-blink ' +
      'e--ua-chrome e--ua-webkit';
  }

  pages.push({
    slug,
    url: ORIGIN + slugPath,
    path: slugPath,
    template,
    seo,
    jsonld,
    jsonldRaw,
    bodyClass,
    images,
    fragment: content ? 'content/' + fragName : null,
    headings: (content || '').match(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/g)?.map(h => decode(h.replace(/<[^>]*>/g, '').trim())).filter(Boolean) || [],
  });
}

pages.sort((a, b) => (a.url < b.url ? -1 : 1));
fs.writeFileSync(path.join(OUT, 'pages.json'), JSON.stringify(pages, null, 2));
console.log('wrote', pages.length, 'pages');
const byTpl = {};
pages.forEach(p => byTpl[p.template] = (byTpl[p.template] || 0) + 1);
console.log(byTpl);
