import { IS_LOGIN } from "./actions";

const initialState = false;
const isLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGIN:
      return action.payload;
    default:
      return state;
  }
};

export default isLoginReducer;
