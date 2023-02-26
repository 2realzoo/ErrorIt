import { MEMBER_ID } from "./actions";

const initialState = { memberId: "" };
const memberIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEMBER_ID:
      return action.payload;
    default:
      return state;
  }
};

export default memberIdReducer;
