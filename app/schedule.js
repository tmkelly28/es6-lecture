'use strict';

import * as fs from 'fs';

export default class Schedule {

  constructor (events=[]) {
    this.schedule = events;
  }

  add (event) {
    this.schedule.push(event);
    console.log('Added to schedule!');
  }

  log () {
    if (!this.schedule.length) return console.log('\nNo events currently scheduled\n');
    console.log('Your schedule: \n');
    for (let event of this.schedule) {
      console.log(`
        ${event.artists[0].name}: ${new Date(event.datetime)}
        ${event.venue.name} ${event.venue.city}, ${event.venue.region}
      `);
    }
  }

  save () {
    return new Promise((resolve, reject) => {
      fs.writeFile('./schedule.json', JSON.stringify(this.schedule), 'utf8', error => {
        if (error) reject(error);
        resolve(this);
      });
    });
  }

  static load () {
    return new Promise((resolve, reject) => {
      fs.readFile('./schedule.json', 'utf8', (error, data) => {
        if (error) reject(error);
        data ? resolve(new Schedule(JSON.parse(data))) : resolve(new Schedule());
      });
    });
  }

}
