import { legacy_createStore as createStore } from "redux";
import rootReducer from "../reducers/rootReducer.js";

const store = createStore(rootReducer);

export default store;
