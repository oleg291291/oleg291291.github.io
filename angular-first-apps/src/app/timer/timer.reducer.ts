import { Action } from '@ngrx/store';

import * as timerAction from '../timer/timer.actions';

import { TimerState } from './timer.models';
import { initialState } from './timer.const';

import { INCREMENT } from './timer.actions';
import { SET } from './timer.actions';

export function timerStore(state: TimerState = initialState, action: timerAction.Action): TimerState {
    switch (action.type) {
        case INCREMENT: {
            return {
                timer: state.timer + 1
            };
        }
        case SET: {
            let x:number = action.value
            return {
                timer: x
            };
        }
        default: {
            return {
                timer: state.timer
            };
        }
    }
}