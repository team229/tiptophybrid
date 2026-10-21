const fs = require('fs');
const f = process.argv[2];
let h = fs.readFileSync(f, 'utf8');
const i = h.indexOf('<body');
let body = h.slice(i);
// strip scripts/styles for readability but keep markers
body = body.replace(/<script[\s\S]*?<\/script>/g, '<!--SCRIPT-->');
body = body.replace(/<style[\s\S]*?<\/style>/g, '<!--STYLE-->');
// add newlines before tags
body = body.replace(/></g, '>\n<');
const lines = body.split('\n');
// collapse empty
const out = lines.filter(l => l.trim() !== '');
fs.writeFileSync(f.replace(/\.html$/, '.body.txt'), out.join('\n'));
console.log('lines:', out.length, '->', f.replace(/\.html$/, '.body.txt'));
