import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { TimerService } from './timer.service';
import { TimerState } from './timer.models';



@Component({
    selector: 'timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.sass']
})

export class TimerComponent {

    private timer$: Observable<TimerState>;
    private timerInput: number

    constructor(private timerService: TimerService) {

        this.timer$ = timerService.getCurrentTimer();

    }

    timerInc(){
        this.timerService.incTimer();
    }
    timerStart(){
        this.timerService.startTimer();
    }
    timerStop(){
        this.timerService.stopTimer();
    }
    timerSet() {
        this.timerService.setTimer(this.timerInput);
    }



}