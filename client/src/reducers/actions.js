export const CURRENT_PAGE = "CURRENT_PAGE";

export const currentPage = (state) => {
  return {
    type: CURRENT_PAGE,
    payload: state,
  };
};
