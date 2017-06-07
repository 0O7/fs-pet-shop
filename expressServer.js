'use strict'

const express = require('express');
const app = express();
const port = 8000;

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json')



app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err.stack);
      return res.sendStatus(500);
    }
    let pets = JSON.parse(data);
    res.send(pets);
  })
});

app.get('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err.stack);
      return res.sendStatus(500);
    }
    let id = parseInt(req.params.id);
    let pets = JSON.parse(data);
    if (id < 0 || id >= pets.length) {
      return res.sendStatus(404);
    }
    res.send(pets[id]);
  });
});

app.post('/pets/name/:nameId/', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err.stack);
      return res.sendStatus(404);
    }
    let name = req.params.nameId;
    let age = parseInt(req.params.age);
    let kind = req.params.kind;
    console.log(name);
    let pets = JSON.parse(data);
    if (!age || !kind || !name){
      console.error("Enter Age, kind, and name");
      process.exit(1);
    }
    let postPet = {
      age,
      kind,
      name
    }
    pets.push(postPet)
    let petString = JSON.stringify(pets);
    fs.writeFile(petsPath,petString,(err)=>{
    if(err){
      console.error(err.stack);
      console.log("Its not working!");
    }
    });

    res.send("New name posted!");
  })
})

app.listen(port, () =>
  console.log('Listening on load...', port)
)
module.exports = app;
