const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const [input, output, width='1080', height='1440'] = process.argv.slice(2);
if (!input || !output) throw new Error('usage: node render_foreignobject.cjs input.html output.png [width] [height]');
const html = fs.readFileSync(input, 'utf8');
const style = (html.match(/<style>([\s\S]*?)<\/style>/i) || ['', ''])[1];
const body = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/i) || ['', ''])[1]
  .replace(/src="assets\//g, `src="${path.resolve('assets')}/`)
  .replace(/url\(['"]?assets\//g, `url('${path.resolve('assets')}/`)
  .replace(/<img([^>]*?)(?<!\/)\s*>/gi, '<img$1/>')
  .replace(/<br\s*>/gi, '<br/>');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>${style}</style>${body}</div></foreignObject></svg>`;
sharp(Buffer.from(svg)).png().toFile(output).then(() => console.log(output));
