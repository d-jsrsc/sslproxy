const http = require("http");
const httpProxy = require("http-proxy");
const Agent = require('agentkeepalive');
const HttpsAgent = require('agentkeepalive').HttpsAgent;
const fs = require("fs");
const path = require("path");

const keepaliveAgent = new HttpsAgent({
  maxSockets: 10000,
  maxFreeSockets: 5000,
  timeout: 60000, // active socket keepalive for 60 seconds
  freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
});
// const keepaliveAgent = new Agent({
//   maxSockets: 10000,
//   maxFreeSockets: 5000,
//   timeout: 60000, // active socket keepalive for 60 seconds
//   freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
// });

const proxy = httpProxy.createProxyServer({
  agent: keepaliveAgent
});

http
  .createServer((req, res) => {
    // proxy.on('')
    proxy.on("error", (err) => {
      console.error(err);
      res.end("error");
    });
    try {
      proxy.web(req, res, {
        target: {
          host: '127.0.0.1',
          port: 2071,
          protocol: 'https:',
          pfx: fs.readFileSync('cert/client.pfx'),
          passphrase: 'penink',
        },
      });  
    } catch (error) {
      console.error(error)
      res.end(error.message)
    }
    
  })
  .listen(2072);

