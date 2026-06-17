const http = require('http');
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const mime = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.svg':'image/svg+xml' };
http.createServer((req, res) => {
  let f = path.join(dir, req.url === '/' ? 'index-preview.html' : req.url);
  try {
    const data = fs.readFileSync(f);
    res.writeHead(200, {'Content-Type': mime[path.extname(f)] || 'text/plain'});
    res.end(data);
  } catch(e) { res.writeHead(404); res.end('not found'); }
}).listen(7823);
