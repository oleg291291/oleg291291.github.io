
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { TimerState } from './timer.models';

import { IncTimerAction, SetTimerAction} from './timer.actions';



@Injectable()
export class TimerService {

    public store$;
    public timerInterval;

    constructor(private store: Store<TimerState>) {
        this.store$ = store.select('timerStore')

    }

    getCurrentTimer(): Observable<TimerState>{
        return this.store$
    }

    public incTimer(): void {
        this.store$.dispatch(new IncTimerAction())
    }
    public startTimer(): void {
        this.timerInterval = setInterval(
            ()=>this.store$.dispatch(new IncTimerAction()), 1000
        )
    }
    public stopTimer(): void {
        clearInterval(this.timerInterval);
    }

    public setTimer(value): void {
        this.store$.dispatch(new SetTimerAction(value));
    }


}
