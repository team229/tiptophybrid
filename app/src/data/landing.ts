/**
 * `/repair/` — the paid-ads landing page.
 *
 * The body reuses the home page sections (hero, services, testimonials, About,
 * contact form) so it looks and behaves exactly like the site, with four
 * changes:
 *
 *   - every “Free Estimate” button scrolls to the form (#contact) instead of
 *     navigating away;
 *   - the “Read More” buttons are removed from the service cards;
 *   - the long “Serving Upland, Montclair, …” paragraph is dropped;
 *   - the FAQ, QR-code and mobile “Send a message” blocks are not shown.
 *
 * The map, consultation CTA and footer are landing-specific components.
 */
import { ASSET_BASE, getFragment } from './content';
import { getPage, type PageData } from './pages';
import { SITE } from './site';

const HOME = getPage('home')!;
const PATH = '/repair/';
const URL = `${SITE.origin}${PATH}`;

export const LANDING_PAGE: PageData = {
  ...HOME,
  slug: 'repair',
  url: URL,
  path: PATH,
  seo: {
    ...HOME.seo,
    // The body duplicates `/`, so keep it out of the index. Flip this to the
    // home page's value if the landing page should rank on its own.
    robots: 'noindex, follow',
    canonical: URL,
    ogUrl: URL,
    next: '',
    prev: '',
  },
};

/** Hero photo — preloaded so it paints before the CSS is parsed. */
export const HERO_IMAGE = `${ASSET_BASE}/wp-content/uploads/2025/10/c5f52145-0aa6-48a9-88eb-cd6b26d94b03.jpg`;

/** The long "Serving Upland, Montclair, …" paragraph — dropped on the landing page. */
const CITY_PARAGRAPH = /<p>Serving Upland[\s\S]*?<\/p>/;

/** Service cards link out to the service pages; the landing page keeps visitors in place. */
const READ_MORE_BUTTON = /<a class="x-btn x-btn-global"[^>]*>Read More<\/a>/g;

/**
 * Split a captured fragment into its top-level `<div>` elements. The home page
 * is a flat list of `.x-section` blocks, so a depth counter is enough — no DOM
 * parser needed at build time.
 */
function splitTopLevelSections(html: string): string[] {
  const tag = /<(\/?)div\b[^>]*>/gi;
  const sections: string[] = [];
  let depth = 0;
  let start = -1;
  let match: RegExpExecArray | null;

  while ((match = tag.exec(html))) {
    if (match[1] === '') {
      if (depth === 0) start = match.index;
      depth += 1;
    } else {
      depth -= 1;
      if (depth === 0 && start !== -1) {
        sections.push(html.slice(start, match.index + match[0].length));
        start = -1;
      }
    }
  }

  return sections;
}

let homeSections: string[] | null = null;

/** home.html order: 0 hero · 1 trusted · 2 services · 3 testimonials · 4 about · 5 contact · 6-9 extras. */
function getHomeSections(): string[] {
  if (!homeSections) homeSections = splitTopLevelSections(getFragment('home'));
  if (homeSections.length < 6) {
    throw new Error('landing: unexpected home fragment structure — expected 10 top-level sections');
  }
  return homeSections;
}

/** Hero + trusted + services + testimonials + About. */
export function getLandingBody(): string {
  const [hero, trusted, services, testimonials, about] = getHomeSections();

  return [
    hero.replace('class="x-section', 'class="x-section landing-hero'),
    trusted.replace(CITY_PARAGRAPH, ''),
    services.replace(READ_MORE_BUTTON, ''),
    testimonials,
    about,
  ]
    .join('\n')
    .replaceAll('href="/free-estimate/"', 'href="#contact"');
}

/**
 * The home page contact section, byte-identical — including the Gravity Forms
 * markup — so the form on the landing page matches the one on the home page.
 */
export function getContactSection(): string {
  return getHomeSections()[5]
    .replace(/\sonclick="[^"]*"/g, '')
    // The Gravity Forms runtime is not loaded on the landing page.
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
    .replace('class="x-section', 'id="contact" class="x-section')
    // Let phones fill the lead form in one tap.
    .replace('name="input_1" id="input_1_1" type="text"', 'name="input_1" id="input_1_1" type="text" autocomplete="name"')
    .replace('name="input_2" id="input_1_2" type="email"', 'name="input_2" id="input_1_2" type="email" autocomplete="email"')
    .replace('name="input_3" id="input_1_3" type="tel"', 'name="input_3" id="input_1_3" type="tel" autocomplete="tel"');
}
