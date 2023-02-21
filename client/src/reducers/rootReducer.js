import { combineReducers } from "redux";
import currentPageReducer from "./currentPageReducer";
import isLoginReducer from "./isLoginReducer";

const rootReducer = combineReducers({
  currentPageReducer,
  isLoginReducer,
});

export default rootReducer;
