const path = require('path');
const http = require('http');
const parseUrl = require('parseurl');
const send = require('send');
const distFolder = path.resolve(__dirname, '../dist/');
  
const server = http.createServer(function onRequest (req, res) {
  send(req, parseUrl(req).pathname, { root: distFolder }).pipe(res)
});

server.listen(3000);