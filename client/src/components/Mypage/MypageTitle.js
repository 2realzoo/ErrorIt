import * as U from "./mypageStyle";
import { FaBirthdayCake, FaRegHandPointRight, FaPencilAlt } from "react-icons/fa";
import { mypage } from "../../reducers/actions";
import { useDispatch } from "react-redux";
import Gravatar from "react-gravatar";

const MypageTitle = ({ userInfo }) => {
  const dispatch = useDispatch();

  const goEdit = () => {
    dispatch(mypage("Edit"));
  };

  return (
    <U.TitleContainer>
      {userInfo.imageUrl === "default" ? <Gravatar email={userInfo.email} default="identicon" size={120} /> : <U.UserImg src={userInfo.imageUrl} />}
      <U.Textbox>
        <h3>{userInfo.name}</h3>
        {/* <p>
          <FaBirthdayCake />
          &nbsp;member.createAt
        </p> */}
        {userInfo.intro ? (
          <p>
            <FaRegHandPointRight className="icon" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userInfo.intro}
          </p>
        ) : (
          <></>
        )}
      </U.Textbox>
      <U.EditBnt onClick={goEdit}>
        <FaPencilAlt />
        &nbsp;Edit profile
      </U.EditBnt>
    </U.TitleContainer>
  );
};

export default MypageTitle;
