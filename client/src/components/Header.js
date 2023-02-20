import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import "./Header.css";
import { TbSearch } from "react-icons/tb";
import { FaGlobeAsia } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { currentPage } from "../reducers/actions";

const HeaderContainer = styled.header`
  position: fixed;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  border-top: 3px solid RGB(244, 130, 37);
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  background-color: hsl(210, 8%, 97.5%);
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
  z-index: 5050;
  top: 0;
`;
const HeaderWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 97.2307692rem;
  max-width: 100%;
  align-items: center;
`;
const MenuWrapper = styled.a`
  display: flex;
  height: 100%;
  padding: 0 var(--su16);
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--theme-topbar-item-background-hover);
  }
`;
const MenuSidebar = styled.div`
  display: ${(props) => props.display || "block"};
  position: fixed;
  top: 50px;
  height: fit-content;
  box-shadow: 0 0 0 hsl(210deg 8% 5% / 5%);
  transition: box-shadow ease-in-out 0.1s, transform ease-in-out 0.1s;
  transform: translateZ(0);
  background-color: var(--white);
`;
const SidebarNav = styled.ol`
  padding-top: 24px;
  margin: 0 0 var(--su12);
`;
const SelectedItem = styled.li`
  position: relative;
  width: 240px;
  display: flex;
  cursor: pointer;
  text-transform: ${(props) => props.textTransform || "none"};
`;
const NavItemWrapper = styled.li`
  position: relative;
  width: 240px;
  display: flex;
  cursor: pointer;
`;
const NavItem = styled.a`
  display: flex;
  align-items: center;
  padding: 10px 4px 10px 18px;
  color: var(--black-600);
  line-height: var(--lh-md);
  font-size: var(--fs-body1);
  &:hover {
    color: var(--black-900);
  }
`;
const Itemflex = styled.span`
  padding-right: 5px;
`;
const NavLink = styled.a`
  display: block;
  font-weight: bold;
  color: var(--black-900);
  background: var(--black-050);
  border-right: 3px solid var(--theme-primary-color);
  width: 100%;
  padding: 10px 4px 10px 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--fs-body1);
`;
const Logo = styled.a`
  margin-right: 8px;
  width: fit-content;
  display: flex;
  align-items: center;
  background-color: transparent;
  height: 100%;
  &:hover {
    background-color: var(--theme-topbar-item-background-hover);
  }
`;
const LogoText = styled.span`
  font-family: var(--theme-post-title-font-family);
  font-size: 100%;
  padding-right: 5px;
  display: block;
  white-space: nowrap;
`;
const Img = styled.img`
  margin-left: 0;
  height: 30px;
  margin-top: -4px;
  padding-left: 3px;
  padding-right: 10px;
`;
const Button = styled.button`
  border-color: hsl(205, 41%, 63%);
  border: 1px solid;
  border-radius: 3px;
  align-self: center;
  padding-top: calc(8px * 1);
  padding-bottom: calc(8px * 1);
  padding-left: 0.8em;
  padding-right: 0.8em;
  cursor: pointer;
  display: inline-block;
  position: relative;
  text-align: center;
  font-size: 0.8rem;
  line-height: 15px;
  box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.7);
  white-space: nowrap;
  ${(props) =>
    props.hoverBackgroundColor
      ? css`
          &:hover {
            background-color: ${props.hoverBackgroundColor};
          }
        `
      : css`
          &:hover {
            background-color: inherit;
          }
        `};

  color: ${(props) => props.color || "hsl(205, 47%, 42%)"};
  background: ${(props) => props.background || "hsl(205, 46%, 92%)"};
  margin-left: ${(props) => props.marginLeft || "0"};
  margin-right: ${(props) => props.marginRight || "0"};
  border-color: ${(props) => props.borderColor || "hsl(205, 41%, 63%)"};
`;
const Search = styled.div`
  background-color: white;
  border: 1px solid hsl(210, 8%, 75%);
  border-radius: 3px;
  color: hsl(210, 8%, 25%);
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: calc(15 / 13);
  width: 100%;
  height: 30.6px;
  padding: 0.6em 0.7em;
  margin-right: 0.5em;
`;
const SearchInput = styled.input`
  width: 100%;
`;

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { currentPageReducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(currentPageReducer);
  // }, [currentPageReducer]);
  // currentPageReducer 상태 확인용 코드

  const handleClickMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handlePageHome = () => {
    dispatch(currentPage("Home"));
  };
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <MenuWrapper onClick={handleClickMenu}>
          <span className={`menu-icon ${openMenu ? "active" : ""}`}></span>
        </MenuWrapper>
        {openMenu ? (
          <MenuSidebar>
            <SidebarNav>
              {currentPageReducer === "Home" ? (
                <SelectedItem onClick={handlePageHome}>
                  <NavLink>Home</NavLink>
                </SelectedItem>
              ) : (
                <NavItemWrapper onClick={handlePageHome}>
                  <NavItem>Home</NavItem>
                </NavItemWrapper>
              )}
              {currentPageReducer === "Question" ? (
                <SelectedItem>
                  <NavLink>Questions</NavLink>
                  <FaGlobeAsia />
                </SelectedItem>
              ) : (
                <NavItemWrapper>
                  <NavItem>
                    <Itemflex>Questions</Itemflex>
                    <FaGlobeAsia />
                  </NavItem>
                </NavItemWrapper>
              )}
              {currentPageReducer === "Tags" ? (
                <SelectedItem>
                  <NavLink>Tags</NavLink>
                </SelectedItem>
              ) : (
                <NavItemWrapper>
                  <NavItem>Tags</NavItem>
                </NavItemWrapper>
              )}
              {currentPageReducer === "Users" ? (
                <SelectedItem>
                  <NavLink>Users</NavLink>
                </SelectedItem>
              ) : (
                <NavItemWrapper>
                  <NavItem>Users</NavItem>
                </NavItemWrapper>
              )}
            </SidebarNav>
          </MenuSidebar>
        ) : (
          <MenuSidebar display="none"></MenuSidebar>
        )}
        <Logo href="/">
          <Img
            className="logo-img"
            src="./img/stackoverflow_logo_icon.png"
            alt="로고이미지"
          />
          <LogoText>ErrorIt Overflow</LogoText>
        </Logo>
        <Search>
          <TbSearch className="search-icon" />
          <SearchInput
            className="search-input"
            type="search"
            placeholder="Search..."
          />
        </Search>
        {isLogin ? (
          <div></div>
        ) : (
          <>
            <a href="http://localhost:3000/login">
              <Button hoverBackgroundColor="var(--_bu-filled-bg-hover)">
                Log in
              </Button>
            </a>
            <a href="/signup">
              <Button
                color="hsl(0,0%,100%)"
                background="hsl(206,100%,52%)"
                marginLeft="4px"
                marginRight="13px"
                borderColor="hsl(206,100%,52%)"
                hoverBackgroundColor="var(--_bu-bg-hover)">
                Sign up
              </Button>
            </a>
          </>
        )}
      </HeaderWrapper>
    </HeaderContainer>
  );
}

export default Header;
