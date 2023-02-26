import { USER_INFO } from "./actions";

const initialState = {
  name: "",
  email: "",
  password: "",
  findQuestion: "",
  findAnswer: "",
};
const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO:
      return action.payload;
    default:
      return state;
  }
};

export default userInfoReducer;
