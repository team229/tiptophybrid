import type { APIRoute } from 'astro';
import { PAGES } from '../data/pages';

const ORIGIN = 'https://www.tiptophybrid.com';

export const GET: APIRoute = () => {
  const urls = PAGES.map((p) => ({
    loc: p.url,
    lastmod: p.seo.modified || undefined,
    changefreq: p.template === 'blog-archive' || p.template === 'entry-content' ? 'weekly' : 'monthly',
    priority: p.slug === 'home' ? '1.0' : p.template === 'entry-content' ? '0.6' : '0.8',
  }));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `	<url>
		<loc>${u.loc}</loc>${u.lastmod ? `\n		<lastmod>${u.lastmod}</lastmod>` : ''}
		<changefreq>${u.changefreq}</changefreq>
		<priority>${u.priority}</priority>
	</url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

export const prerender = true;
export const _unused = ORIGIN;
