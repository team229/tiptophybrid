const fs = require('fs');
const a = process.argv[2];
const b = process.argv[3];

function sections(file) {
  const s = fs.readFileSync(file, 'utf8');
  // split top-level x-section blocks
  const out = [];
  const re = /<div class="x-section[^"]*"([^>]*)>/g;
  let m;
  const marks = [];
  while ((m = re.exec(s)) !== null) marks.push({ start: m.index, attrs: m[1] });
  for (let i = 0; i < marks.length; i++) {
    const start = marks[i].start;
    const end = i + 1 < marks.length ? marks[i + 1].start : s.length;
    let depth = 0, i2 = start;
    const tagRe = /<(\/?)div\b[^>]*>/g;
    tagRe.lastIndex = start;
    let mm;
    while ((mm = tagRe.exec(s)) !== null) {
      depth += mm[1] === '/' ? -1 : 1;
      if (depth === 0) { i2 = mm.index + mm[0].length; break; }
    }
    const chunk = s.slice(start, i2);
    const norm = chunk
      .replace(/\b(?:e|m)\d*[a-z]*-[0-9a-z]+\b/g, '')
      .replace(/ id="[^"]*"/g, '')
      .replace(/data-id="[^"]*"/g, '')
      .replace(/style="[^"]*"/g, 'style=""')
      .replace(/\s+/g, ' ')
      .trim();
    out.push({ attrs: marks[i].attrs.replace(/\b(?:e|m)\d*[a-z]*-[0-9a-z]+\b/g, '').replace(/\s+/g, ' '), norm });
  }
  return out;
}
const A = sections(a), B = sections(b);
console.log('A sections:', A.length, ' B sections:', B.length);
for (let i = 0; i < Math.max(A.length, B.length); i++) {
  const x = A[i], y = B[i];
  const same = x && y && x.norm === y.norm;
  console.log(`\n[${i}] ${same ? 'SAME' : 'DIFF'}  A:${x ? x.attrs.slice(0, 90) : '-'}  B:${y ? y.attrs.slice(0, 90) : '-'}`);
  if (!same) {
    const sa = x ? x.norm : '', sb = y ? y.norm : '';
    let i2 = 0; while (i2 < sa.length && i2 < sb.length && sa[i2] === sb[i2]) i2++;
    console.log('   A:', JSON.stringify(sa.slice(Math.max(0, i2 - 80), i2 + 200)));
    console.log('   B:', JSON.stringify(sb.slice(Math.max(0, i2 - 80), i2 + 200)));
  }
}
