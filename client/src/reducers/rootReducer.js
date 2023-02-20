import { combineReducers } from "redux";
import currentPageReducer from "./currentPageReducer";

const rootReducer = combineReducers({
  currentPageReducer,
});

export default rootReducer;
