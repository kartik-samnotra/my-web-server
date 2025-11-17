const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const PORT = 3000;

const pagesDir = path.join(__dirname, 'pages');

const stylesDir = path.join(__dirname, 'styles');

async function readHTMLFile(filename) 
{
    try 
    {
        const filePath = path.join(pagesDir, filename);
        const content = await fs.readFile(filePath, 'utf8');
        return content;

    } 
    catch (error) 
    {
        throw new Error(`Cannot read file: ${filename}`);
    }

}

async function readCSSFile(filename) 
{
    try 
    {
        const filePath = path.join(stylesDir, filename);
        const content = await fs.readFile(filePath, 'utf8');
        return content;
    } catch (error) 
    {
        throw new Error(`Cannot read CSS file: ${filename}`);
    }
}

function getContentType(filePath) 
{
    const ext = path.extname(filePath);
    switch (ext) 
    {
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        default:
            return 'text/html';
    }
}

const server = http.createServer(async (req, res) => 
    {

    const url = req.url;
    
    console.log(`Request received: ${url}`);

    try 
    {

        if (url.startsWith('/styles/')) 
        {
            const cssFile = path.basename(url);
            const cssContent = await readCSSFile(cssFile);
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(cssContent);
            return;
        }

        let htmlContent;
        let statusCode = 200;

        switch (url) 
        {
            case '/':
            case '/home':
                htmlContent = await readHTMLFile('home.html');
                break;
            case '/about':
                htmlContent = await readHTMLFile('about.html');
                break;
            case '/contact':
                htmlContent = await readHTMLFile('contact.html');
                break;
            default:
                htmlContent = await readHTMLFile('404.html');
                statusCode = 404;
        }

        res.writeHead(statusCode, { 'Content-Type': 'text/html' });
        res.end(htmlContent);

    } catch (error) {
        console.error('Error:', error.message);
        

        try 
        {
            const errorContent = await readHTMLFile('404.html');
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(errorContent);
        } catch 
        {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
    }


});

server.listen(PORT, () => 
{
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('  - /home');
    console.log('  - /about');
    console.log('  - /contact');
    console.log('Press Ctrl+C to stop the server');


});

server.on('error', (error) => {
    console.error('Server error:', error);
});

process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});