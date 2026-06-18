const http = require('http');
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const mime = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.svg':'image/svg+xml', '.webp':'image/webp', '.png':'image/png' };
http.createServer((req, res) => {
  const urlPath = (req.url || '/').split('?')[0];
  const fileName = urlPath === '/' ? 'index-preview.html' : urlPath.replace(/^\//, '');
  const f = path.join(dir, fileName);
  if (!f.startsWith(dir)) { res.writeHead(403); res.end('forbidden'); return; }
  try {
    const data = fs.readFileSync(f);
    res.writeHead(200, {'Content-Type': mime[path.extname(f)] || 'text/plain'});
    res.end(data);
  } catch(e) { res.writeHead(404); res.end('not found'); }
}).listen(7823);
