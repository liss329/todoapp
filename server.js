const http = require("http");
const fs = require("fs");
const path = require('path');
let mime = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript"
    // 読み取りたいMIMEタイプはここに追記
};



var http_server = new http.createServer(function(req, res) {

    if (req.url == '/') {
      filePath = '/index.html';
    } else {
      filePath = req.url;
    }
    var fullPath = __dirname + filePath;
  
    res.writeHead(200, {"Content-Type": mime[path.extname(fullPath)] || "text/plain"});
    fs.readFile(fullPath, function(err, data) {
      if (err) {
        // エラー時の応答
      } else {
        res.end(data, 'UTF-8');
      }
    });
  }).listen(3000);

console.log("Server start");
