import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const body = `User-agent: *
Disallow: /wp-admin/
Allow: /

Sitemap: https://www.tiptophybrid.com/sitemap.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

export const prerender = true;
