import React from "react";
import styled from "styled-components";
import Container from "./commons/Container";
import Wrapper from "./commons/Wrapper";
import { SlCheck } from "react-icons/sl";

const Title = styled.div`
  font-size: 1.7rem;
  max-width: calc(var(--s-step) * 3.3);
  text-align: center;
  margin-bottom: var(--su24);
  margin-left: auto;
  margin-right: auto;
`;
const LinkedWord = styled.a`
  margin-top: 2rem;
  color: var(--theme-link-color);
  cursor: pointer;
`;
const IconWrapper = styled.div`
  padding-top: 2rem;
  padding-bottom: 3rem;
  .check-icon {
    font-size: 6rem;
    color: var(--black-700);
  }
`;
function AlertSignUp() {
  return (
    <Container pageName="AlertChange">
      <Wrapper>
        <Title>Member registration completed</Title>
        <IconWrapper>
          <SlCheck className="check-icon" />
        </IconWrapper>
        <div>You have completed your membership.</div>
        <div>Please log in.</div>
        <LinkedWord href="/login">Log in</LinkedWord>
      </Wrapper>
    </Container>
  );
}

export default AlertSignUp;
