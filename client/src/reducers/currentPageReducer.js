import { CURRENT_PAGE } from "./actions";

const initialState = "Home";

const currentPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_PAGE:
      return action.payload;
    default:
      return state;
  }
};

export default currentPageReducer;
