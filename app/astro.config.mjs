// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

/**
 * `ASSET_BASE` controls where the mirrored WordPress assets are loaded from:
 *
 *   ASSET_BASE=                     -> use the copy in /public (self-contained)
 *   ASSET_BASE=https://www.tiptophybrid.com
 *                                   -> hot-link the production CDN
 *
 * The original site lives at https://www.tiptophybrid.com and its canonical
 * URLs, Open Graph URLs and JSON-LD `@id` values all point there, so `site`
 * stays set to the production origin.
 */
const ASSET_BASE = process.env.ASSET_BASE ?? '';

export default defineConfig({
  site: 'https://www.tiptophybrid.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: true }),
  ],
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    define: {
      'import.meta.env.ASSET_BASE': JSON.stringify(ASSET_BASE),
      'import.meta.env.PUBLIC_ASSET_BASE': JSON.stringify(ASSET_BASE),
    },
  },
});
