import { getPage, type PageData } from './pages';
import { SITE } from './site';

/**
 * Build a PageData entry for a hand-written page (legal pages, thank-you, …)
 * by inheriting the site's shared SEO defaults from the home page.
 */
export function legalPage(
  slug: string,
  path: string,
  title: string,
  description: string,
): PageData {
  const home = getPage('home')!;
  const url = `${SITE.origin}${path}`;

  return {
    ...home,
    slug,
    url,
    path,
    seo: {
      ...home.seo,
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogUrl: url,
      canonical: url,
      next: '',
      prev: '',
    },
  };
}
