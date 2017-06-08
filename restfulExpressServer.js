'use strict';

const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const port = process.env.PORT || 8000;


const morgan = require('morgan');
const bodyParser = require('body-parser');
app.use(morgan('short'));
app.use(bodyParser.json());


app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsData) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let petsJSON = JSON.parse(petsData);
    res.send(petsJSON);
  });
});

app.get('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsData) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let petsJSON = JSON.parse(petsData);
    let id = parseInt(req.params.id);

    if (id < 0 || id >= petsJSON.length || Number.isNaN(id)) {
        return res.sendStatus(404);
    }

    res.send(petsJSON[id]);


  });
});

app.post('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsData) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let petsJSON = JSON.parse(petsData);

    let name = req.body.name;
    let age = parseInt(req.body.age);
    let kind = req.body.kind;

    if (!name || isNaN(age) || !kind) {
      return res.sendStatus(400);
    }
    if (age && name && kind) {
      let newArray = {
        age,
        name,
        kind
      }
      petsJSON.push(newArray);
    let newpetJSON = JSON.stringify(petsJSON);
    fs.writeFile(petsPath, newpetJSON, (err) => {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }
    });
    res.send(newArray);
  }

  });
});

app.patch('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsData) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let petsJSON = JSON.parse(petsData);
    let id = parseInt(req.params.id);

    if (id < 0 || id > petsData.length || isNaN(id)) {
      return res.send(404);
    }
    let name = req.body.name;
    let kind = req.body.kind;
    let age = parseInt(req.body.age);

    if (age) {
      petsJSON[id].age = age;
    }
    if (kind) {
      petsJSON[id].kind = kind;
    }
    if (name) {
      petsJSON[id].name = name;
    }

    let newpetJSON = JSON.stringify(petsJSON);
    fs.writeFile(petsPath, newpetJSON, (err) => {
      if (err) {
        return res.sendStatus(500);
      }
      res.send(petsJSON[id]);
    });
  });
});

app.delete('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsData) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let id = parseInt(req.params.id);
    let petsJSON = JSON.parse(petsData);

    if (id < 0 || id >= petsJSON.length || isNaN(id)) {
      return res.sendStatus(404);
    }

    let petsDelete = petsJSON.splice(id, 1)[0];
    let newpets = JSON.stringify(petsJSON);

    fs.writeFile(petsPath, newpets, (err) => {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }
      res.send(petsDelete);
    });

  });
});
app.listen(port, () => {
  console.log('Listening on port', port);
})
module.exports = app;
