// Import required modules
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// Define the port number
const PORT = 3000;

// Define the base directory for static files
const pagesDir = path.join(__dirname, 'pages');
const stylesDir = path.join(__dirname, 'styles');

// Function to read HTML files asynchronously
async function readHTMLFile(filename) {
    try {
        const filePath = path.join(pagesDir, filename);
        const content = await fs.readFile(filePath, 'utf8');
        return content;
    } catch (error) {
        throw new Error(`Cannot read file: ${filename}`);
    }
}

// Function to read CSS files asynchronously
async function readCSSFile(filename) {
    try {
        const filePath = path.join(stylesDir, filename);
        const content = await fs.readFile(filePath, 'utf8');
        return content;
    } catch (error) {
        throw new Error(`Cannot read CSS file: ${filename}`);
    }
}

// Function to determine content type based on file extension
function getContentType(filePath) {
    const ext = path.extname(filePath);
    switch (ext) {
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

// Create the server
const server = http.createServer(async (req, res) => {
    // Get the requested URL
    const url = req.url;
    
    console.log(`Request received: ${url}`);

    try {
        // Handle CSS files
        if (url.startsWith('/styles/')) {
            const cssFile = path.basename(url);
            const cssContent = await readCSSFile(cssFile);
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(cssContent);
            return;
        }

        // Route handling
        let htmlContent;
        let statusCode = 200;

        switch (url) {
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
                // If route not found, serve 404 page
                htmlContent = await readHTMLFile('404.html');
                statusCode = 404;
        }

        // Set response headers and send content
        res.writeHead(statusCode, { 'Content-Type': 'text/html' });
        res.end(htmlContent);

    } catch (error) {
        // Error handling
        console.error('Error:', error.message);
        
        // Try to serve 404 page, if that fails send basic error message
        try {
            const errorContent = await readHTMLFile('404.html');
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(errorContent);
        } catch {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('  - /home');
    console.log('  - /about');
    console.log('  - /contact');
    console.log('Press Ctrl+C to stop the server');
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});