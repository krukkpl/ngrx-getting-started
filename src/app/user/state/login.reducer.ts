export function reducer(state, action) {
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
