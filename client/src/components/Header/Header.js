import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuSideBar from "./MenuSideBar";
import HeaderSearch from "./HeaderSearch";
import Button from "./Button";
import logo from "../../asset/stackoverflow_logo_icon.png";
import axios from "axios";
import Gravatar from "react-gravatar";

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
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  height: 100%;
  &:hover {
    background-color: var(--theme-topbar-item-background-hover);
  }
`;
const LogoText = styled.span`
  font-family: ${(props) => props.fontFamily || "Poppins,sans-serif"};
  font-size: ${(props) => props.fontSize || "100%"};
  padding-right: 5px;
  display: block;
  white-space: nowrap;
  font-weight: ${(props) => props.fontWeight || ""};
`;
const Img = styled.img`
  margin-left: 0;
  height: 30px;
  margin-top: -4px;
  padding-left: 3px;
  padding-right: 1px;
`;
const UserImg = styled.a`
  margin: 0.5rem;
  margin-left: 0.5rem;
  .user-img {
    border-radius: 5px;
  }
`;

function Header() {
  const { userInfoReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHintOpen, setIsHintOpen] = useState(false);
  const imageUri = sessionStorage.getItem("imageUri");

  const handleLogout = () => {
    return axios
      .post("/api/logout", {
        headers: {
          "ngrok-skip-browser-warning": "12",
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => sessionStorage.clear())
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };
  window.addEventListener("click", (e) => {
    e.target.className.includes("search-box")
      ? setIsHintOpen(true)
      : setIsHintOpen(false);
  });

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <MenuSideBar />
        <Logo href="/">
          <Img className="logo-img" src={logo} alt="로고이미지" />
          <LogoText>ErrorIt</LogoText>
          <LogoText fontWeight="800"> Overflow</LogoText>
        </Logo>
        <HeaderSearch isHintOpen={isHintOpen} />
        {sessionStorage.getItem("memberId") ? (
          <>
            <UserImg href="/user">
              {imageUri === "default" ? (
                <Gravatar
                  email={userInfoReducer.email}
                  default="identicon"
                  size={33}
                  className="user-img"
                />
              ) : (
                <Img src="imageUri"></Img>
              )}
            </UserImg>
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
