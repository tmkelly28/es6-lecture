'use strict';

import fetch from './fetch';
import prompt, {promptForEvent} from './prompt';

function* generateEvents (events) {
  for (let event of events) {
    yield promptForEvent(event, `
      ${event.artists[0].name}: ${new Date(event.datetime)}
      ${event.venue.name} ${event.venue.city}, ${event.venue.region}
      Do you want to attend this event? > `);
  }
}

function cycleEvents (it, done) {
  let result = it.next();
  if (result.done) done();
  else result.value
    .then(response => {
      if (response.answer === 'y') console.log(`
        Added the show at ${response.event.venue.name} to the schedule!
      `);
      cycleEvents(it, done);
    })
    .catch(err => {
      console.error(err);
      cycleEvents(it, done);
    });
}

export default function search (done) {
  let _bandName;
  prompt('Enter an artist to search for > ')
    .then(bandName => {
      _bandName = bandName;
      return fetch(bandName);
    })
    .then(events => {
      events = events.filter(event => event.venue.region === 'NY' || event.venue.region === 'NJ');
      console.log(`
        Upcoming concerts for ${_bandName} in NY/NJ
      `);
      let it = generateEvents(events);
      cycleEvents(it, done);
    })
    .catch(error => {
      console.error(error);
      done();
    });
}
