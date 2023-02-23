import styled from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaGlobeAsia } from "react-icons/fa";
import { currentPage } from "../reducers/actions";

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
  const handlePageHome = (page) => {
    dispatch(currentPage("Home"));
  };
  return (
    <BarContainer>
      <MenuContainer>
        <MenuList>
          <Menus
            className={currentPageReducer === "Home" ? "active" : ""}
            onClick={() => {
              handlePageHome();
            }}
          >
            Home
          </Menus>
          <Menus className={currentPageReducer === "Questions" ? "active" : ""}>
            Questions <FaGlobeAsia className="questionIcon" />
          </Menus>
          <Menus className={currentPageReducer === "Tags" ? "active" : ""}>Tags</Menus>
          <Menus className={currentPageReducer === "Users" ? "active" : ""}>Users</Menus>
        </MenuList>
      </MenuContainer>
    </BarContainer>
  );
};

export default Sidebar;
