import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the HoursMinutesSeconds pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'HoursMinutesSeconds'
})
@Injectable()
export class HoursMinutesSeconds {

  transform(value, args) {
    let minutes = Math.floor(value/60);

    return minutes;
   }
}
