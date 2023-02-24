import * as U from "./mypageStyle";
import { FaBirthdayCake, FaRegHandPointRight, FaPencilAlt } from "react-icons/fa";
import { mypage } from "../../reducers/actions";
import { useDispatch } from "react-redux";

const MypageTitle = () => {
  const dispatch = useDispatch();

  const goEdit = () => {
    dispatch(mypage("Edit"));
  };

  return (
    <U.TitleContainer>
      <U.UserImg />
      <U.Textbox>
        <h3>member.name</h3>
        <p>
          <FaBirthdayCake />
          &nbsp;member.createAt
        </p>
        <p>
          <FaRegHandPointRight className="icon" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;member.intro
        </p>
      </U.Textbox>
      <U.EditBnt onClick={goEdit}>
        <FaPencilAlt />
        &nbsp;Edit profile
      </U.EditBnt>
    </U.TitleContainer>
  );
};

export default MypageTitle;
