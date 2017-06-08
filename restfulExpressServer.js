'use strict';

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.JSON');
// const app = express.Router();

const bodyParser = require('body-parser');
// const pets = require('restfulExpressServer');
const morgan = require('morgan');
const port = process.env.PORT || 8000;

app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsData) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    const pets = JSON.parse(petsData);


    res.send(pets);
  });
});

app.get('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsData) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(err);
    }
    const id = parseInt(req.params.id);
    const pets = JSON.parse(petsData);

    if (id >= 0 && id <= pets.length && !isNaN(id)) {
      res.send(pets[id]);
    } else {
      return res.sendStatus(404);
    }

  });
});

app.post('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsData) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let pets = JSON.parse(petsData);

    let name = req.body.name;
    let age = parseInt(req.body.age);
    let kind = req.body.kind;

    if (!name || isNaN(age) || !kind) {
      return res.sendStatus(404);
    }
    if (age && name && kind) {
      let petArray = {
        age,
        name,
        kind
      }
      pets.push(petArray);
    }

    let newpetJSON = JSON.stringify(pets);
    fs.writeFile(petsPath, newpetJSON, (err) => {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }
    });
    res.send(pet);
  });
});

app.patch('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsData) => {
    if (err) {
      console.log(err.stack);
      return res.sendStatus(500);
    }
    let pets = JSON.parse(petsData);
    let id = parseInt(req.params.id);
    if (id < 0 || id > petsData.length || isNaN(id)) {
      res.send(404);
    }
    let name = req.body.name;
    let kind = req.body.kind;
    let age = parseInt(req.body.age);

    if (age === true) {
      pets[id].age = age;
    }
    if (kind === true) {
      pets[id].kind = kind;
    }
    if (name === true) {
      pets[id].name = name;
    }

    let newpetJSON = JSON.stringify(pets);
    fs.writeFile(petsPath, newpetJSON, (err) => {
      if (err) {
        return res.sendStatus(500);
      }
    })
    res.send(pets[id]);
  });
});

app.delete('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsData) => {
    if (err) {
      console.error(err);
      return res.sendStatus(404);
    }
    let pets = JSON.parse(petsData);


    if (id < 0 || id > pets.length || isNaN(pets)) {
      res.sendStatus(404);
    }
    let petsDelete = pets.slice(id, 1);
    let newpetsJSON = JSON.stringify(pets);

    fs.writeFile(petsData, newpetsJSON, (err) => {
      if (err) {
        return res.sendStatus(500);
      }
      res.send(petsDelete);
    })

  })
})
app.listen(port, () => {
  console.log('Listening on port', port);
})
module.exports = app;
