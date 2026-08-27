/* Servidor estático simples para desenvolvimento local.
   Rode com:  node dev-server.js     →  http://localhost:4321          */
const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 4321;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css' : 'text/css; charset=utf-8',
  '.js'  : 'text/javascript; charset=utf-8',
  '.svg' : 'image/svg+xml',
  '.png' : 'image/png',
  '.jpg' : 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico' : 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.mp4' : 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/') rel = '/index.html';

  const file = path.join(__dirname, path.normalize(rel).replace(/^(\.\.[\/\\])+/, ''));
  if (!file.startsWith(__dirname)) { res.writeHead(403).end('Forbidden'); return; }

  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }).end('404'); return; }
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    res.end(data);
  });
}).listen(PORT, () => console.log(`\n  Pizzaria do Zé → http://localhost:${PORT}\n`));
