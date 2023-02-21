import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  padding: var(--su24);
  position: relative;
  left: 0;
  right: 0;
  background-color: var(--theme-footer-background-color);
  display: flex;
  flex-direction: column;
`;

const Logo = styled.a`
  display: flex;
  align-items: flex-start;
  background-color: transparent;
  width: fit-content;
`;

const Img = styled.img`
  height: 38px;
  margin-bottom: var(--su24);
`;

const Team = styled.h5`
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: var(--su12);
  color: var(--theme-footer-title-color);
  line-height: var(--lh-md);
`;

const Names = styled.ul`
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  column-gap: var(--su12);
  row-gap: var(--su8);
  padding-right: 12px;
  padding-bottom: 24px;
`;

const Text = styled.li`
  color: var(--theme-footer-link-color);
  line-height: var(--lh-md);
  list-style: none;
  padding-left: 0px;
  font-size: 0.8rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <Logo href="/">
        <Img src="./img/stackoverflow_logo_icon.png"></Img>
      </Logo>
      <Team>Error-It</Team>
      <Names>
        <Text>박경서</Text>
        <Text>이진주</Text>
        <Text>하지웅</Text>
        <Text>전진우</Text>
        <Text>신은진</Text>
        <Text>김태환</Text>
      </Names>
      <Text>Copyright2023.Error-It All rights reserved.</Text>
    </FooterContainer>
  );
}

export default Footer;
