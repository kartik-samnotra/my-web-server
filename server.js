var http = require('http');
var fs = require('fs');
var path = require('path');

var PORT = 3000;


function servePage(pageName, response) {
    var pagePath = path.join(__dirname, 'pages', pageName);
    fs.readFile(pagePath, function(err, data) {
        if (err) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.end('Server Error: Could not read page');
        } else {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        }
    });
}

function serve404Page(response) {
    var notFoundPath = path.join(__dirname, 'pages', '404.html');
    
    fs.readFile(notFoundPath, function(err, data) {
        if (err) {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end('404 - Page Not Found');

        } else {
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(data);

        }
    });
}

var server = http.createServer(function(request, response) {
    var url = request.url;
    
    console.log('Requested: ' + url);
    if (url === '/' || url === '/home') {
        servePage('home.html', response);
    } 
    else if (url === '/about') {
        servePage('about.html', response);
    } 
    else if (url === '/contact') {
        servePage('contact.html', response);
    } 
    else {
        serve404Page(response);
    }
});

server.listen(PORT, function() {
    console.log('Server has started!');
    console.log('http://localhost:' + PORT);
    console.log('  http://localhost:' + PORT + '/home');
    console.log('  http://localhost:' + PORT + '/about');
    console.log('  http://localhost:' + PORT + '/contact');
    console.log('  http://localhost:' + PORT + '/something-else (to see 404 page)');
});

server.on('error', function(err) {
    if (err.code === 'EADDRINUSE') {
        console.log('Port ' + PORT + ' is already in use. Try a different port.');
    } else {
        console.log('Server error: ' + err.message);
    }
});