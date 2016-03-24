'use strict';

import * as readline from 'readline';
import search from './search';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Welcome to ConcertGoer');

function main () {

  rl.question('What do you want to do? > ', command => {
    switch (command) {
      case 'search':
        search(rl, main)
        break;
      default:
        console.log('Not a valid command');
        main();
    }
  });
}

main();
