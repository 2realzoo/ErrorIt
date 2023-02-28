import { combineReducers } from "redux";
import currentPageReducer from "./currentPageReducer";
import isLoginReducer from "./isLoginReducer";
import userInfoReducer from "./userInfoReducer";
import mypageReducer from "./mypageReducer";

const rootReducer = combineReducers({
  currentPageReducer,
  isLoginReducer,
  userInfoReducer,
  mypageReducer,
});

export default rootReducer;
