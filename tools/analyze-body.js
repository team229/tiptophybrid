const fs = require('fs');
const f = process.argv[2] || '/Users/abhay/tipto-clone/home.html';
const h = fs.readFileSync(f, 'utf8');
const body = h.split('<body')[1] || h;
// list top-level-ish structure: elementor sections
const secs = body.match(/<section[\s\S]*?<\/section>/g) || [];
console.log('SECTIONS:', secs.length);
secs.forEach((s, i) => {
  const cls = (s.match(/class="([^"]*)"/) || [])[1] || '';
  const cid = (s.match(/data-id="([^"]*)"/) || [])[1] || '';
  const ty = (s.match(/data-element_type="([^"]*)"/) || [])[1] || '';
  const heading = (s.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/g) || []).map(x => x.replace(/<[^>]*>/g, '').trim()).filter(Boolean).slice(0, 4);
  console.log(`\n--- [${i}] ${ty} data-id=${cid}\n    class: ${cls.slice(0, 200)}\n    headings: ${JSON.stringify(heading)}`);
});
console.log('\n\n=== ELEMENTOR WIDGETS (h2/h3/h4 texts) ===');
const hs = body.match(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/g) || [];
hs.forEach(x => console.log(x.replace(/<[^>]*>/g, '').trim().slice(0, 120)));
