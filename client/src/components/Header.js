import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

  color: ${(props) => props.color || "hsl(205, 47%, 42%)"};
  background: ${(props) => props.background || "hsl(205, 46%, 92%)"};
  margin-left: ${(props) => props.marginLeft || "0"};
  border-color: ${(props) => props.borderColor || "hsl(205, 41%, 63%)"};
`;

function Header() {
  return (
    <header>
      <Link to="/">
        <img src="./img/stackoverflow_logo_icon.png" alt="로고이미지" />
        <span>ErrorIt Overflow</span>
      </Link>
      <input type="search" placeholder="Search..."></input>
      <Button>Log in</Button>
      <Button color="hsl(0,0%,100%)">Sign up</Button>
    </header>
  );
}

export default Header;
