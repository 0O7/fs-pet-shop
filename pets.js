'use strict';

let fs = require('fs');
let path = require('path');
let petsPath = path.join(__dirname, 'pets.json');
let node = path.basename(process.argv[0]);
let file = path.basename(process.argv[1]);
let cmd = process.argv[2];
let selector = process.argv[3];

if (cmd === 'read') {

  fs.readFile(petsPath, 'utf8', function(err, data) {
    var pets = JSON.parse(data);
    if (err) {
      throw err;
    }
    if (selector >= JSON.parse(data).length || selector < 0) {
      console.error(`Usage: ${node} ${file} read INDEX`);
      process.exit(1);
    }

    if (selector == undefined) {
      console.log(pets);
      process.exit();
    } else {
      console.log(pets[selector]);

    }

  });
} else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {

    if (readErr) {
      throw readErr;
    }

    let pets = JSON.parse(data);

    let age = parseInt(process.argv[3]);
    let kind = process.argv[4];
    let name = process.argv[5];

    if (!age || !kind || !name) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    const pet = {
      age,
      kind,
      name
    };


    pets.push(pet);

    var guestsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, guestsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pet);
    });
  });
} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
