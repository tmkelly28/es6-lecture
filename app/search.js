'use strict';

import fetch from './fetch';
import prompt from './prompt';

export default function search (done) {
  let _bandName;
  prompt('Enter an artist to search for > ')
    .then(bandName => {
      _bandName = bandName;
      return fetch(bandName);
    })
    .then(events => {
      console.log(`${_bandName} has ${events.length} concerts coming up!`);
      done();
    })
    .catch(error => {
      console.error(error);
      done();
    });
}
