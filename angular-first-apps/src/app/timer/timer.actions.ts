import { Action } from '@ngrx/store';

export const INCREMENT: string = 'INCREMENT';
export const SET: string = 'SET';

export class IncTimerAction implements Action {
  public readonly type: string = INCREMENT;
}
export class SetTimerAction implements Action {
  public readonly type: string = SET;
  constructor(public value: number){};
}

export type Action = SetTimerAction;
