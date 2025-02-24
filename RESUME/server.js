const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
    let reqUrl = req.url.toLowerCase().replace(/\/$/, '') || '/';
    let filePath;

    // Serve static files (CSS, JS, Images, etc.)
    if (reqUrl.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico)$/)) {
        filePath = path.join(PUBLIC_DIR, reqUrl);
    } else {
        // Handle routes
        switch (reqUrl) {
            case '/':
                filePath = path.join(PUBLIC_DIR, 'index.html');
                res.statusCode = 200;
                break;
            case '/calculator':
                filePath = path.join(PUBLIC_DIR, 'Calculator-app', 'Calculator.html');
                res.statusCode = 200;
                break;
            case '/notes':
                filePath = path.join(PUBLIC_DIR, 'Notes-app', 'Notes.html');
                res.statusCode = 200;
                break;
            default:
                filePath = path.join(PUBLIC_DIR, '404.html');
                res.statusCode = 404;
        }
    }

    // Get file extension
    const extname = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.json': 'application/json',
        '.ico': 'image/x-icon'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);

    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                fs.readFile(path.join(PUBLIC_DIR, '404.html'), (error, content) => {
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200);
            res.end(data, 'utf-8');
        }
    });
});

server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
