import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TimerService} from './service/timer.service';



import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule
  ],
  providers: [TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
