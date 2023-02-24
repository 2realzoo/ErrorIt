import { MYPAGE } from "./actions";

const initialState = "Questions";

const mypageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MYPAGE:
      return action.payload;
    default:
      return state;
  }
};

export default mypageReducer;
