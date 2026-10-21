# Tip Top Hybrid — Astro + React replica

A static replica of **https://www.tiptophybrid.com** built with **Astro 5** and **React 19**.

All 148 URLs of the live site are reproduced, together with the original meta tags,
Open Graph / Twitter cards, Yoast + custom JSON-LD structured data and every
tracking snippet (Google Tag Manager, GA4, Google Ads, Microsoft Clarity,
call tracking, Wordfence).

---

## Quick start

```bash
cd app
npm install
npm run dev        # http://localhost:4321
npm run build      # -> app/dist
npm run preview    # serve the production build
```

### Asset hosting

The replica can serve the site's images / CSS / JS either **locally** (mirrored
into `app/public`) or **hot-linked from the production CDN**:

```bash
npm run build                                   # local copy (default)
ASSET_BASE=https://www.tiptophybrid.com npm run build   # hot-linked
```

`ASSET_BASE` is injected at build time (see `astro.config.mjs`) and substituted
for the `__ASSET_BASE__` placeholder that the content extractor writes into every
captured fragment.

---

## How the site was captured

`www.tiptophybrid.com` refuses TCP connections from datacenter IPs, so the pages
were pulled through the `r.jina.ai` reader (`X-Return-Format: html`), which returns
the fully rendered DOM. Binary assets were mirrored through `images.weserv.nl`
and `r.jina.ai`.

The capture pipeline lives in `tools/`:

| Script | Purpose |
| --- | --- |
| `fetch.sh` | Fetches every page into `capture/raw/*.html` |
| `extract-pages.js` | Splits each capture into SEO data, JSON-LD and a body fragment → `app/src/data/pages.json` + `app/src/content/*.html` |
| `extract-css.js` | Pulls the original inline `<style>` blocks into `app/src/styles/*.css` |
| `extract-head.js` | Captures the shared tracking snippets → `app/src/data/head-parts.json` |
| `mirror-assets.sh`, `mirror-cssjs*.sh`, `mirror-js-browser.sh` | Mirror images, CSS/JS into `app/public` |
| `mirror-fonts.sh`, `mirror-icons.sh`, `mirror-wp-core.sh` | Mirror webfonts, icon fonts and WordPress core scripts |

Re-running `extract-pages.js` regenerates the data + fragments from `capture/raw/`.

---

## Project structure

```
tiptophybrid/
├── app/                      # the Astro project
│   ├── astro.config.mjs      # site URL, React + Tailwind integrations, ASSET_BASE
│   ├── tailwind.config.mjs   # default Tailwind theme (matches cdn.tailwindcss.com)
│   ├── public/               # mirrored assets (images, css, js, fonts) — 66 MB
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx    # top bar, nav + services dropdown, mobile drawer, sticky bar
│   │   │   ├── Footer.tsx    # 4-column footer
│   │   │   ├── ContactForm.tsx# Gravity Forms markup (form 1 = estimate, form 2 = contact)
│   │   │   └── icons.tsx     # inline Lucide icons (same path data as the CDN build)
│   │   ├── content/          # verbatim body fragments captured from the live site
│   │   ├── data/
│   │   │   ├── pages.json    # per-page SEO, JSON-LD, template type
│   │   │   ├── pages.ts      # typed accessors
│   │   │   ├── content.ts    # inlines the fragments at build time
│   │   │   ├── head-parts.json# shared tracking snippets
│   │   │   └── site.ts       # business info, services, cities
│   │   ├── layouts/BaseLayout.astro
│   │   ├── pages/
│   │   │   ├── index.astro   # home page
│   │   │   ├── [...slug].astro# catch-all for the other 147 routes
│   │   │   ├── 404.astro
│   │   │   ├── sitemap.xml.ts
│   │   │   └── robots.txt.ts
│   │   └── styles/
│   │       ├── global.css     # import order mirrors the original document
│   │       ├── cs.css         # the Pro theme's custom CSS (cs-inline-css)
│   │       ├── inline-custom.css# header / brand styles lifted from the site
│   │       └── wp-*.css       # WordPress global styles
├── capture/                  # raw HTML captured from the live site + URL lists
│   ├── raw/*.html            # 150 rendered pages
│   ├── home-root.html        # full capture of the home page (tracking snippets)
│   └── *.txt                 # URL / asset lists
├── tools/                    # the capture + build pipeline
└── README.md
```

---

## Templates

| Template | Pages | Rendering |
| --- | --- | --- |
| `cs-content` | 76 | Pro-theme page-builder blocks (`#cs-content`) — home, 64 city pages, contact, free estimate, testimonials, … |
| `entry-content` | 60 | WordPress blog posts |
| `blog-archive` | 6 | Blog index + `/blogs/page/2…6/` |
| `elementor-html` | 6 | Service pages built with Elementor's HTML widget |

---

## Preserved metadata & tracking

* `<title>`, `<meta name="description">`, `robots`, `generator`, `msapplication-TileImage`
* `canonical`, `rel=next` / `rel=prev` (blog pagination), RSS + favicon links
* `og:locale / og:type / og:title / og:description / og:url / og:site_name`, `twitter:card`
* JSON-LD: Yoast graph, `AutoRepair`, `LocalBusiness`, `Product`, `FAQPage` — byte-identical
* Scripts: GTM (`GTM-KF7BFWB9`), GA4 (`G-6L0VTXRB3V`), Google Ads (`AW-16632046138`),
  Microsoft Clarity (`vmbm134riy`), `call-tracking_9.js`, `wcm/loader.js`, Wordfence,
  Gravity Forms runtime, jQuery + migrate

Canonical URLs, Open Graph URLs and JSON-LD `@id`s deliberately point at
`https://www.tiptophybrid.com` — exactly as the production site does.

---

## Notes

* The live site renders its header template **twice** in the DOM (a WordPress
  "Header Footer Elementor" quirk). Because the header is `position: fixed`, both
  copies overlap and the page looks identical either way; the replica renders it once.
* The `Forms` post back to Gravity Forms on the WordPress backend. Set
  `PUBLIC_FORM_ENDPOINT` to your own handler to receive submissions; without it the
  form shows the confirmation message locally.
