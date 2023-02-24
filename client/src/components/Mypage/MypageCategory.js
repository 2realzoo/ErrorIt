import * as C from "./mypageStyle";
import { mypage } from "../../reducers/actions";
import { useDispatch, useSelector } from "react-redux";

const MypageCategory = () => {
  const { mypageReducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  const changeCategory = (category) => {
    dispatch(mypage(category));
  };

  return (
    <C.CategoryContainer>
      <C.Category
        onClick={() => {
          changeCategory("Questions");
        }}
        className={mypageReducer === "Questions" ? "active" : ""}
      >
        Questions
      </C.Category>
      <C.Category
        onClick={() => {
          changeCategory("Answers");
        }}
        className={mypageReducer === "Answers" ? "active" : ""}
      >
        Answers
      </C.Category>
      <C.Category
        onClick={() => {
          changeCategory("Edit");
        }}
        className={mypageReducer === "Edit" ? "active" : ""}
      >
        Setting
      </C.Category>
    </C.CategoryContainer>
  );
};

export default MypageCategory;
