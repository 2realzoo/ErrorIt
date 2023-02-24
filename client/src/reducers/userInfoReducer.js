import { USER_INFO } from "./actions";
import { MEMBER_ID } from "./actions";

const initialState = {
  name: "",
  email: "",
  findQuestion: "",
  findAnswer: "",
};
const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO:
      return action.payload;
    case MEMBER_ID:
      return action.payload;
    default:
      return state;
  }
};

export default userInfoReducer;
