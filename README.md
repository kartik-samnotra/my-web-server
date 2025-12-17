# Simple Web Server Using NodeJS

---

## Assignment Overview

The server is designed to handle multiple routes (`/`, `/home`, `/about`, `/contact`), and include styling from an external CSS file. It runs on port 3000.

---

### **Request–Response Flow**

1. **Server Initialization**  
   The server starts using `http.createServer()` and begins listening on port 3000.

2. **Request Handling**  
   The server extracts `req.url` from each incoming request.

3. **Routing System**  
   A switch-based routing system matches URL paths to corresponding HTML templates inside the `pages/` directory.

4. **File Serving Process**  
   Files are read asynchronously using `fs.promises`, ensuring non-blocking I/O.

5. **Response Generation**  
   Proper HTTP status codes (`200 OK`, `404 Not Found`) and MIME types (`text/html`, `text/css`) are included in the response headers.

---

