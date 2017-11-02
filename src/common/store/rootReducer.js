import { combineReducers } from "redux";
import { reducer as idleReducer } from "redux-promises";

import userReducer from "./user/reducer";

export const getRootReducer = navigationReducer => {
  return combineReducers({
    idle: idleReducer,
    nav: navigationReducer,
    user: userReducer
  });
};

export default getRootReducer;
