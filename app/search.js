'use strict';

import * as http from 'http';

export default function search (rl, done) {
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
        done();
      })
    })
    .on('error', error => {
      console.error(error);
      done();
    });
  });
}
