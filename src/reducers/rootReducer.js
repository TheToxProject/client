/**
 * Created by amoghbanta on 04/02/17.
 */
import { combineReducers } from "redux";
import UIReducer from "./uiReducer/index";

//this is the list of final reducers
export default combineReducers({
  ui: UIReducer.reducer
});
