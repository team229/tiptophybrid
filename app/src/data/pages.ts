import pagesData from './pages.json';

export interface SeoData {
  title: string;
  description: string;
  robots: string;
  ogLocale: string;
  ogType: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogSiteName: string;
  ogImage: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  canonical: string;
  next: string;
  prev: string;
  modified: string;
  published: string;
  generator: string;
  tileImage: string;
  links: string[];
}

export interface PageData {
  slug: string;
  url: string;
  path: string;
  template: 'cs-content' | 'entry-content' | 'elementor-html' | 'blog-archive' | 'unknown';
  seo: SeoData;
  jsonld: unknown[];
  jsonldRaw: string[];
  bodyClass: string;
  images: string[];
  fragment: string | null;
  headings: string[];
}

export const PAGES = pagesData as PageData[];

export const bySlug = new Map(PAGES.map((p) => [p.slug, p]));

export function getPage(slug: string): PageData | undefined {
  return bySlug.get(slug);
}

export function getPageByPath(path: string): PageData | undefined {
  const slug = path === '/' ? 'home' : path.replace(/^\/|\/$/g, '');
  return bySlug.get(slug);
}

/** Blog posts (everything that is not a static page) in publish order. */
export const BLOG_POSTS = PAGES.filter((p) => {
  if (['home', 'contact', 'free-estimate', 'testimonials', 'blogs'].includes(p.slug)) return false;
  if (p.slug.startsWith('hybrid-vehicle-specialist-')) return false;
  if (
    [
      'hybrid-transaxle-drivetrain-service',
      'hybrid-engine-transmission-replacement',
      'inverter-water-pump-service',
      'inverter-brake-actuator-repair',
      'high-voltage-system-repair',
      'toyota-prius-battery-repair-replacement',
      'upland-auto-body-car-repair-shop-services',
      'get-in-touch-upland-auto-body-car-repair-services',
    ].includes(p.slug)
  )
    return false;
  return true;
});
