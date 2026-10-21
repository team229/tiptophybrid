/**
 * The page bodies were captured from the live site as raw HTML fragments so the
 * replica is pixel-identical. They are inlined at build time (no runtime fetch).
 *
 * `__ASSET_BASE__` inside a fragment marks a URL that pointed at
 * https://www.tiptophybrid.com on the original site. It is replaced at build
 * time with `ASSET_BASE`:
 *   - empty  -> the mirrored copy in /public is used (self-contained build)
 *   - origin -> the original CDN is used (hot-linked, byte-identical assets)
 */
const modules = import.meta.glob('../content/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const ASSET_BASE: string =
  (import.meta.env?.ASSET_BASE as string | undefined) ??
  (typeof process !== 'undefined' ? (process.env?.ASSET_BASE ?? '') : '');

const fragments = new Map<string, string>();
for (const [path, mod] of Object.entries(modules)) {
  const name = path.split('/').pop()!.replace(/\.html$/, '');
  // Depending on the Vite version the raw import may already be a string or a
  // module namespace with a `default` export.
  const value =
    typeof mod === 'string'
      ? mod
      : ((mod as { default?: unknown }).default as string | undefined) ?? '';
  fragments.set(name, value);
}

export function getFragment(name: string): string {
  const raw = fragments.get(name) ?? '';
  return raw.replaceAll('__ASSET_BASE__', ASSET_BASE);
}

/** Same replacement, for snippets stored outside the content folder. */
export function withAssetBase(html: string): string {
  return html
    .replaceAll('__ASSET_BASE__', ASSET_BASE)
    .replaceAll('https://www.tiptophybrid.com', ASSET_BASE);
}
