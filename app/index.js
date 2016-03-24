'use strict';

import prompt from './prompt';
import search from './search';

console.log('Welcome to ConcertGoer');

function main () {
  prompt('What do you want to do? > ')
    .then(command => {
      switch (command) {
        case 'search':
          search(main);
          break;
        default:
          console.log('Not a valid command');
          main();
      }
    })
    .catch(error => {
      console.error(error);
      main();
    });
}

main();
