export interface UserState {
  maskUserName: boolean;
}

const initialState: UserState = {
  maskUserName: true
};

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
