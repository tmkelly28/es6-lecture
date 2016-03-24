'use strict';

const readline = require('readline');
const http = require('http');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function main () {

  console.log('Welcome to ConcertGoer');

  rl.question('What do you want to do? > ', command => {
    switch (command) {
      case 'search':
        rl.question('Enter an artist to search for > ', bandName => {
          let responseBody = '';
          http.get({
            host: 'api.bandsintown.com',
            path: `/artists/${bandName.replace(/\s/g, '%20')}/events.json?app_id=ES6_LECTURE`
          }, res => {
            res.on('data', data => responseBody += data);
            res.on('end', () => {
              let events = JSON.parse(responseBody);
              console.log(`${bandName} has ${events.length} concerts coming up!`);
              main();
            })
          })
          .on('error', error => console.error);
        });
        break;
      default:
        console.log('Not a valid command');
        main();
    }
  });
}

main();
