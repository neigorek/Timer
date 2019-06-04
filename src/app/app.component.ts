import { Component,  OnDestroy } from '@angular/core';
import {TimerService} from './service/timer.service';
import {Subject, Subscription, timer} from 'rxjs';
import {map, scan, share, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private timerService : TimerService) { }

  tick = 0 ;
  title = 'iteam';
  secDispl : number = 0;
  minDispl : number = 0;
  hourDispl : number = 0;
  sec: Subscription;
  count: boolean = false;
  stopPlay$ : Subject<any> = new Subject();
  isSingleClick:boolean = true;
  tiimer:any;

  private startTimer() {

    let temer = timer(0,1000);

    if (!this.count) {

      this.sec = temer
        .pipe(
          scan((acc, curr) => (curr ? curr  : curr + acc ), this.tick),
          map(() => this.tick++),
          takeUntil(this.stopPlay$),
          share(),
        )
        .subscribe(
          () => {
            this.secDispl = this.timerService.getSeconds(this.tick);
            this.minDispl = this.timerService.getMinutes(this.tick);
            this.hourDispl = this.timerService.getHours(this.tick);
          }
        );
      this.count = !this.count
    }

    else {

      this.stopPlay$.next(false)
      this.secDispl = 0;
      this.minDispl = 0;
      this.hourDispl = 0;
      this.tick = 0;
      this.count = !this.count;

    }


  }

  private waitTimer1() {

    if (this.isSingleClick){

      this.tiimer = setTimeout(() => {

        this.isSingleClick = !this.isSingleClick;
        this.count = !this.count;

      }, 300);

      this.isSingleClick = !this.isSingleClick;
      this.count = !this.count;

    }
    else {

      this.stopPlay$.next(false)
      this.count = !this.count;
      this.tiimer = clearTimeout();
      this.isSingleClick = !this.isSingleClick


    }

  }

  private resetTimer() {

    this.secDispl = 0;
    this.minDispl = 0;
    this.hourDispl = 0;
    this.tick = 0;

  }
}



