import { combineReducers } from "redux";
import currentPageReducer from "./currentPageReducer";
import isLoginReducer from "./isLoginReducer";
import userInfoReducer from "./userInfoReducer";

const rootReducer = combineReducers({
  currentPageReducer,
  isLoginReducer,
  userInfoReducer,
});

export default rootReducer;
