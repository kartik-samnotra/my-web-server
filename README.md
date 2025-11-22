# 🌐 Simple Node.js Web Server

This project is a minimal, yet fully functional, web server built using Node.js and its built-in **http** and **fs** modules. It demonstrates core web development concepts, including modular routing, asynchronous file serving, and proper HTTP error handling.

---

## 🚀 Project Overview

The server is designed to handle multiple defined routes (`/`, `/home`, `/about`, `/contact`), serve static HTML content, and include styling from an external CSS file. It runs on **port 3000** and follows a clean, modular structure.

---

## 🏗️ Architecture

The server uses a request–response model and Node.js's non-blocking I/O for efficient file serving.

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

## 📁 Project Structure
my-web-server/
├── server.js # Main server file
├── pages/ # HTML templates for routes
│ ├── home.html
│ ├── about.html
│ ├── contact.html
│ └── 404.html
├── styles/ # CSS stylesheets
│ └── style.css
└── package.json # Project configuration (optional)


---

## 🛣️ Route Configuration

| URL Path             | HTML File     | HTTP Status     | Description           |
|----------------------|---------------|------------------|------------------------|
| `/`                  | home.html     | 200 OK           | Home page (root)       |
| `/home`              | home.html     | 200 OK           | Home page              |
| `/about`             | about.html    | 200 OK           | About page             |
| `/contact`           | contact.html  | 200 OK           | Contact page           |
| `/styles/style.css`  | style.css     | 200 OK           | CSS Stylesheet         |
| Any other route      | 404.html      | 404 Not Found    | Custom error page      |

---

## ⚡ Key Features

- **Modular Design** with separated HTML and CSS directories  
- **Asynchronous I/O** using `fs.promises`  
- **Proper HTTP Headers** and status codes  
- **Custom 404 Page** for invalid routes  
- **Static File Serving** for CSS  
- **RESTful-style Routing**

---

## ⚙️ Installation & Usage

### **Prerequisites**
- Node.js installed on your system

### **Start the Server**
```bash
node server.js

