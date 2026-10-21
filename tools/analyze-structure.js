const fs = require('fs');
const path = require('path');
const dir = '/Users/abhay/tipto-clone/raw';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const out = {};
for (const f of files) {
  const h = fs.readFileSync(path.join(dir, f), 'utf8');
  const bi = h.search(/<body[\s>]/);
  const body = bi >= 0 ? h.slice(h.indexOf('>', bi) + 1) : h;
  // find main content between entry-content and footer
  const main = body.split('class="entry-content content"')[1] || '';
  const sections = main.match(/<div class="x-section[^"]*"[^>]*>/g) || [];
  const heads = (main.match(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/g) || []).map(x => x.replace(/<[^>]*>/g, '').trim());
  const imgs = [...new Set((main.match(/https:\/\/www\.tiptophybrid\.com\/wp-content\/uploads\/[^"')\s]+\.(?:jpg|jpeg|png|webp|gif|svg)/gi) || []))];
  const title = (h.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || '';
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  out[f] = {
    title: title.replace(/&amp;/g, '&'),
    desc,
    sections: sections.length,
    heads,
    imgs,
    hasGravityForm: /gform_wrapper/.test(body),
    bodyClass: (h.match(/<body[^>]*class="([^"]*)"/) || [])[1] || '',
  };
}
fs.writeFileSync('/Users/abhay/tipto-clone/structure.json', JSON.stringify(out, null, 2));
console.log('pages analyzed:', files.length);
// group by section count
const groups = {};
for (const [k, v] of Object.entries(out)) {
  const key = v.sections + '|' + v.heads.slice(0, 3).join(' ~ ');
  groups[key] = groups[key] || [];
  groups[key].push(k);
}
const sorted = Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
for (const [k, v] of sorted) {
  console.log(`\n[${v.length}x] ${k}`);
  if (v.length <= 4) console.log('    ' + v.join('\n    '));
}
