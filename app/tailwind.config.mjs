/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './src/content/**/*.html',
  ],
  // The live site loads https://cdn.tailwindcss.com (Tailwind v3 Play CDN) with the
  // default configuration, so we keep the default theme here on purpose.
  theme: {
    extend: {},
  },
  plugins: [],
};
