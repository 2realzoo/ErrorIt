import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuSideBar from "./MenuSideBar";
import HeaderSearch from "./HeaderSearch";
import Button from "./Button";
import { isLogin } from "../../reducers/actions";
import logo from "../../asset/stackoverflow_logo_icon.png";
import axios from "axios";

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
  width: 80rem;
  max-width: 100%;
  align-items: center;
  .menu-icon {
    width: var(--su-static16);
    height: var(--su-static2);
    background-color: var(--theme-topbar-item-color);
    display: block;
    position: relative;
    left: 0;
    right: 0;
    min-width: 16px;
  }
  .menu-icon.active {
    background-color: transparent;
  }
  .menu-icon::before {
    left: 0;
    right: 0;
    top: -5px;
    transition: top, transform;
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;
  }
  .active::before {
    transform: rotate(-45deg);
    top: 0;
  }
  .menu-icon::after {
    left: 0;
    right: 0;
    top: 5px;
    transition: top, transform;
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;
  }
  .active::after {
    transform: rotate(45deg);
    top: 0;
  }
  .menu-icon::before,
  .menu-icon::after {
    content: "";
    display: block;
    position: absolute;
    background-color: var(--theme-topbar-item-color);
    height: var(--su-static2);
  }
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

function Header() {
  const { isLoginReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    return axios
      .post("/api/logout")
      .then((res) => dispatch(isLogin(false)))
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <MenuSideBar />
        <Logo href="/">
          <Img className="logo-img" src={logo} alt="로고이미지" />
          <LogoText>ErrorIt Overflow</LogoText>
        </Logo>
        <HeaderSearch />
        {isLoginReducer ? (
          <>
            <a href="/user">
              <Img></Img>
            </a>
            <Button onClick={handleLogout} marginLeft="4px" marginRight="13px">
              Log out
            </Button>
          </>
        ) : (
          <>
            <a href="http://localhost:3000/login">
              <Button
                hoverBackgroundColor="var(--_bu-filled-bg-hover)"
                marginLeft="0.5rem">
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
