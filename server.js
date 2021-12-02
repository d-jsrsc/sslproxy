const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const httpsOptions = {
    // key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    // cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
  key: fs.readFileSync(path.join(__dirname,'cert/server.key')),
  cert: fs.readFileSync(path.join(__dirname,'cert/server.crt'))
}

// http.createServer((req, res) => {
//     res.end('hi');
// }).listen(2071);
https.createServer(httpsOptions, (req, res) => {
    res.end('hi');
}).listen(2071);

