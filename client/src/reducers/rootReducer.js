import { combineReducers } from "redux";
import currentPageReducer from "./currentPageReducer";
import isLoginReducer from "./isLoginReducer";
import userInfoReducer from "./userInfoReducer";
import mypageReducer from "./mypageReducer";
import memberIdReducer from "./memberIdReduce";

const rootReducer = combineReducers({
  currentPageReducer,
  isLoginReducer,
  userInfoReducer,
  mypageReducer,
  memberIdReducer,
});

export default rootReducer;
