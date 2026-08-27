/* Servidor estático simples para desenvolvimento local.
   Rode com:  node dev-server.js     →  http://localhost:<PORT>          */
const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4321;
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

  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) { res.writeHead(404, { 'Content-Type': 'text/plain' }).end('404'); return; }

    const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
    const range = req.headers.range;

    /* Range requests: sem isso o browser não consegue dar seek em <video>,
       video.seekable fica vazio e o scrub por scroll não funciona. */
    if (range) {
      const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
      if (m) {
        let start = m[1] === '' ? null : parseInt(m[1], 10);
        let end   = m[2] === '' ? null : parseInt(m[2], 10);

        if (start === null && end !== null) {          // bytes=-N → últimos N bytes
          start = Math.max(0, stat.size - end);
          end = stat.size - 1;
        } else {
          if (start === null) start = 0;
          if (end === null || end >= stat.size) end = stat.size - 1;
        }

        if (start > end || start >= stat.size) {
          res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` }).end();
          return;
        }

        res.writeHead(206, {
          'Content-Type': type,
          'Content-Range': `bytes ${start}-${end}/${stat.size}`,
          'Content-Length': end - start + 1,
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'no-store'
        });
        fs.createReadStream(file, { start, end }).pipe(res);
        return;
      }
    }

    res.writeHead(200, {
      'Content-Type': type,
      'Content-Length': stat.size,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-store'
    });
    fs.createReadStream(file).pipe(res);
  });
}).listen(PORT, () => console.log(`\n  dev-server → http://localhost:${PORT}\n`));
