export const CURRENT_PAGE = "CURRENT_PAGE";
export const IS_LOGIN = "IS_LOGIN";
export const USER_INFO = "USER_INFO";
export const MEMBER_ID = "MEMBER_ID";
export const MYPAGE = "MYPAGE";

export const currentPage = (state) => {
  return {
    type: CURRENT_PAGE,
    payload: state,
  };
};

export const isLogin = (state) => {
  return {
    type: IS_LOGIN,
    payload: state,
  };
};

export const userInfo = (state) => {
  return {
    type: USER_INFO,
    payload: state,
  };
};

export const memberId = (state) => {
  return {
    type: MEMBER_ID,
    payload: state,
  };
};

export const mypage = (state) => {
  return {
    type: MYPAGE,
    payload: state,
  };
};
