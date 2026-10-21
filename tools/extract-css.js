/**
 * Pull the original site's inline <style> blocks out into real CSS files
 * that the Astro build imports. Keeps the replica pixel-identical.
 */
const fs = require('fs');
const path = require('path');

const ROOT = '/Users/abhay/tipto-clone';
const OUT = path.join(ROOT, 'app/src/styles');
fs.mkdirSync(OUT, { recursive: true });

const html = fs.readFileSync(path.join(ROOT, 'capture/raw/home.html'), 'utf8');
const styles = html.match(/<style[^>]*>[\s\S]*?<\/style>/g) || [];

const wanted = {
  'cs-inline-css': 'cs.css',
  'global-styles-inline-css': 'wp-global-styles.css',
  'wp-block-library-theme-inline-css': 'wp-block-library-theme.css',
  'classic-theme-styles-inline-css': 'wp-classic-theme.css',
  'wp-emoji-styles-inline-css': 'wp-emoji.css',
  'wp-img-auto-sizes-contain-inline-css': 'wp-img-auto-sizes.css',
};

const found = {};
styles.forEach(s => {
  const id = (s.match(/id="([^"]+)"/) || [])[1];
  const css = s.replace(/^<style[^>]*>/, '').replace(/<\/style>$/, '');
  if (id && wanted[id]) found[id] = css;
  else if (id) found[id] = css;
});

// unnamed style blocks (the custom inline <style> from the HTML widgets)
const unnamed = styles.filter(s => !/id="/.test(s.slice(0, 120)));

for (const [id, file] of Object.entries(wanted)) {
  if (found[id]) {
    // Point asset URLs at the local mirror instead of the production origin.
    const css = found[id].replace(
      /url\((['"]?)https:\/\/www\.tiptophybrid\.com([^'")]+)\1\)/g,
      "url('$2')",
    );
    fs.writeFileSync(path.join(OUT, file), css);
    console.log('wrote', file, css.length);
  }
}

// All remaining unnamed inline styles -> one file
const rest = unnamed
  .map((s) => s.replace(/^<style[^>]*>/, '').replace(/<\/style>$/, ''))
  .join('\n')
  .replace(
    /url\((['"]?)https:\/\/www\.tiptophybrid\.com([^'")]+)\1\)/g,
    "url('$2')",
  );
fs.writeFileSync(path.join(OUT, 'inline-custom.css'), rest);
console.log('wrote inline-custom.css', rest.length);

// Style blocks that are page/elementor specific (ids like elementor-460 ...) are captured
// per-element in the extracted fragments; list whatever is left for reference.
const leftover = Object.keys(found).filter(k => !wanted[k]);
console.log('other style ids:', leftover.join(', '));
