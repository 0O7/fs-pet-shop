'use strict';

const http = require('http');
const path = require('path');
const petsPath = path.join(__dirname, '/pets.json');
const port = 8000;
const fs = require('fs');




let server = http.createServer((req, res) => {

  if (req.method === 'GET' && req.url === "/pets") {
    fs.readFile(petsPath, 'utf8', (err, petsData) => {
      if (err) {
        throw err;
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(petsData);

    })

  } else if (req.method === 'GET' && req.url === '/pets/0') {
    fs.readFile(petsPath, 'utf8', (err, petsData) => {
      if (err) {
        throw err;
      }

      let pets = JSON.parse(petsData);
      let petsJSON = JSON.stringify(pets[0]);

      res.setHeader('Content-Type', 'application/json');
      res.end(petsJSON);
    })
  } else if (req.method === 'GET' && req.url === '/pets/1') {
    fs.readFile(petsPath, 'utf8', (err, petsData) => {
      if (err) {
        throw err;
      }

      let pets = JSON.parse(petsData);
      let petsJSON = JSON.stringify(pets[1]);

      res.setHeader('Content-Type', 'application/json');
      res.end(petsJSON);
    })
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }

})

server.listen(port, () => {
  console.log("Listening on port", port)
});

module.exports = server;
