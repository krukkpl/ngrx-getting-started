import { Action } from '@ngrx/store';

export enum UserActionTypes {
  ToggleMaskUserName = '[User] Toggle Mask User Name'
}

export class ToggleMaskUserName implements Action {
  readonly type = UserActionTypes.ToggleMaskUserName;

  constructor(public maskUserName: boolean) {
  }
}

export type UserActions = ToggleMaskUserName;
