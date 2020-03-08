import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserState {
  maskUserName: boolean;
}

const initialState: UserState = {
  maskUserName: true
};

const getUserFeatureState = createFeatureSelector<UserState>('user');
export const getMaskUserName = createSelector(getUserFeatureState, userState => userState.maskUserName);

export function reducer(state: UserState = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MASK_USER_NAME':
      return {
        ...state,
        maskUserName: action.payload
      }

    default:
      return state;
  }
}
