import React from "react";
import styled from "styled-components";
import "./Header.css";
import { TbSearch } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";

const HeaderWrapper = styled.header`
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
`;

const Logo = styled.a`
  margin: 0 8px 0 8px;
  width: 150px;
  min-width: 150px;
  display: flex;
  align-items: center;
  background-color: transparent;
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
  font-size: 13px;
  line-height: 15px;
  box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.7);
  white-space: nowrap;

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

function Header() {
  return (
    <HeaderWrapper>
      <div className="header-wrapper">
        <RxHamburgerMenu className="menu-icon" />
        <Logo href="/">
          <img
            className="logo-img"
            src="./img/stackoverflow_logo_icon.png"
            alt="로고이미지"
          />
          <span className="logo-text">ErrorIt Overflow</span>
        </Logo>
        <Search>
          <TbSearch className="search-icon" />
          <input
            className="search-input"
            type="search"
            placeholder="Search..."
          />
        </Search>
        <Button>Log in</Button>
        <Button
          color="hsl(0,0%,100%)"
          background="hsl(206,100%,52%)"
          marginLeft="4px"
          marginRight="13px"
          borderColor="hsl(206,100%,52%)">
          Sign up
        </Button>
      </div>
    </HeaderWrapper>
  );
}

export default Header;
