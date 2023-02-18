import React, { useState } from "react";
import styled, { css } from "styled-components";
import "./Header.css";
import { TbSearch } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";

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

const Logo = styled.a`
  margin: 0 8px 0 8px;
  width: 150px;
  min-width: 150px;
  display: flex;
  align-items: center;
  background-color: transparent;
`;

const LogoText = styled.span`
  font-family: var(--theme-post-title-font-family);
  font-size: 100%;
`;
const Img = styled.img`
  margin-left: 0;
  height: 30px;
  margin-top: -4px;
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

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <RxHamburgerMenu className="menu-icon" />
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
