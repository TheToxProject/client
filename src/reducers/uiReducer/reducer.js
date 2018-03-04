import * as types from "./types";

const initialState = {
  loginAnimationRan: false
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_ANIMATION_RAN:
      return {
        ...state,
        loginAnimationRan: true
      };
    default:
      return state;
  }
}
