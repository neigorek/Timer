import {Timer} from '../Timer';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


@Injectable()
export class TimerService {

  getSeconds(time: number) : Observable<Timer> {

    return this.pad(time % 60);


  }

  getMinutes(time: number) : Observable<Timer> {

    return this.pad((Math.floor(time / 60)) % 60);
  }

  getHours(time: number) : Observable<Timer> {

    return this.pad(Math.floor((time / 60) / 60));

  }


  pad(num:any){

    return num <= 9 ? '0' + num : num;

  }

}
