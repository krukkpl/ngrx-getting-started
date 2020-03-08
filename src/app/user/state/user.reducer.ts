import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';

export interface UserState {
  maskUserName: boolean;
}

const initialState: UserState = {
  maskUserName: true
};

const getUserFeatureState = createFeatureSelector<UserState>('user');
export const getMaskUserName = createSelector(getUserFeatureState, userState => userState.maskUserName);

export function reducer(state: UserState = initialState, action: UserActions) {
  switch (action.type) {
    case UserActionTypes.ToggleMaskUserName:
      return {
        ...state,
        maskUserName: action.maskUserName
      };

    default:
      return state;
  }
}
