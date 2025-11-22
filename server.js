const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 3000;



const PAGES = path.join(__dirname, 'pages');


const STYLES = path.join(__dirname, 'styles');
async function servePage(res, filename, status = 200) 
{
    try 
    {
        const filePath = path.join(PAGES, filename);
        const html = await fs.readFile(filePath, 'utf8');
        res.writeHead(status, { 'Content-Type': 'text/html' });
        res.end(html);
    } 
    catch 
    {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}


async function serveCSS(res, filename) 
{
    try 
    {
        const filePath = path.join(STYLES, filename);
        const css = await fs.readFile(filePath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(css);


    } catch 
    {
        servePage(res, '404.html', 404);

    }
}

const server = http.createServer(async (req, res) => 
{
    const url = req.url;
    console.log(` → Request: ${url}`);

    // Serve CSS files
    if (url.startsWith('/styles/')) {
        const styleFile = path.basename(url);
        return serveCSS(res, styleFile);
    }

    if (url === '/' || url === '/home') {
        return servePage(res, 'home.html');
    }

    if (url === '/about') {
        return servePage(res, 'about.html');
    }

    if (url === '/contact') {
        return servePage(res, 'contact.html');
    }
    servePage(res, '404.html', 404);
});

server.listen(PORT, () => {
    console.log(`\nServer running → http://localhost:${PORT}`);
    console.log('Routes available: /home /about /contact\n');
});

server.on('error', err => {
    console.error('Server Error:', err.message);
});

process.on('SIGINT', () => {
    console.log('\nShutting down...');
    server.close(() => {
        console.log('Server closed ✔');
        process.exit(0);
    });
});