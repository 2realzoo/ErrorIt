import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FaGlobeAsia } from "react-icons/fa";
import { currentPage } from "../reducers/actions";
import { useNavigate } from "react-router";

const BarContainer = styled.div`
  width: 200px;
  border-right: 1px solid var(--black-075);
  position: relative;
`;
const MenuContainer = styled.div`
  width: 100%;
  height: 30vh;
  position: sticky;
  top: 100px;
`;

const MenuList = styled.ul``;
const Menus = styled.li`
  width: 100%;
  height: 40px;
  padding-left: 10%;
  line-height: 40px;
  color: var(--black-600);
  position: relative;
  cursor: pointer;
  :hover {
    color: var(--black-800);
  }
  .questionIcon {
    position: absolute;
    top: 13px;
    margin-left: 5px;
  }
  &.active {
    background: var(--black-050);
    border-right: 3px solid var(--theme-primary-color);
    cursor: default;
  }
`;

const Sidebar = () => {
  const { currentPageReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <BarContainer>
      <MenuContainer>
        <MenuList>
          <Menus
            className={currentPageReducer === "Question" ? "active" : ""}
            onClick={() => {
              dispatch(currentPage("Question"));
              navigate("/");
            }}
          >
            Questions <FaGlobeAsia className="questionIcon" />
          </Menus>
          <Menus
            className={currentPageReducer === "Tags" ? "active" : ""}
            onClick={() => {
              dispatch(currentPage("Tags"));
              navigate("/");
            }}
          >
            Tags
          </Menus>
          <Menus
            className={currentPageReducer === "Users" ? "active" : ""}
            onClick={() => {
              dispatch(currentPage("Question"));
              navigate("/mypage");
            }}
          >
            Users
          </Menus>
        </MenuList>
      </MenuContainer>
    </BarContainer>
  );
};

export default Sidebar;
