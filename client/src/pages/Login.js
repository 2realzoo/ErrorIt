import React from "react";
import styled from "styled-components";

const LoginContainer = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex: 1 0 auto;
  background-color: var(--black-050);
  height: 100%;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 95vh;
`;

const Logo = styled.a`
  margin: 0 8px 0 8px;
  display: flex;
  align-items: center;
  background-color: transparent;
`;

const Img = styled.img`
  margin-left: auto;
  margin-right: auto;
  height: 38px;
  margin-bottom: var(--su24);
`;
const FormContainer = styled.div`
  box-shadow: var(--bs-xl);
  padding: var(--su24);
  margin-bottom: var(--su24);
  margin-left: auto;
  margin-right: auto;
  background-color: var(--white);
  border-radius: var(--br-lg);
`;

const Label = styled.label`
  font-size: 0.95rem;
  color: var(--fc-dark);
  font-family: inherit;
  font-weight: 600;
  padding: 0 var(--su2);
  margin-top: ${(props) => props.marginTop || "0"};
  margin-bottom: ${(props) => props.marginBottom || "0"};
  margin-right: 0;
  margin-left: 0;
`;

const Input = styled.input`
  -webkit-appearance: none;
  width: 100%;
  margin: calc(var(--su4) / 2);
  margin-right: 0;
  margin-left: 0;
  padding: 0.6em 0.7em;
  border: 1px solid var(--bc-darker);
  border-radius: var(--br-sm);
  background-color: var(--white);
  color: var(--fc-dark);
  font-size: var(--fs-body1);
  font-family: inherit;
`;

const Form = styled.div`
  margin: calc(var(--su12) / 2);
  margin-right: 0;
  margin-left: 0;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  margin: calc(var(--su16) / 2);
  margin-right: 0;
  margin-left: 0;
  background-color: var(--_bu-bg);
  border: var(--_bu-baw) solid var(--_bu-bc);
  border-radius: var(--_bu-br);
  box-shadow: var(--_bu-bs);
  color: white;
  font-size: var(--_bu-fs);
  padding: var(--_bu-p);
  cursor: pointer;
  display: inline-block;
  font-family: inherit;
  font-weight: normal;
  line-height: var(--lh-sm);
  position: relative;
  width: 100%;
  --_bu-baw: var(--su-static1);
  --_bu-bc: transparent;
  --_bu-br: var(--br-sm);
`;
const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Caption = styled.a`
  font-size: var(--fs-caption);
  --_li-fc: var(--theme-link-color);
  --_li-fc-hover: var(--theme-link-color-hover);
  --_li-fc-visited: var(--theme-link-color-visited);
  color: var(--_li-fc);
  cursor: pointer;
  text-decoration: none;
  user-select: auto;
`;

const GuideWrapper = styled.div`
  max-width: 300px;
  width: 100%;
  text-align: center;
  font-size: var(--fs-body1);
  padding: 16px;
  margin-bottom: 24px;
  margin-left: auto;
  margin-right: auto;
`;

function Login() {
  return (
    <LoginContainer>
      <LoginWrapper>
        <Logo href="/">
          <Img src="./Img/stackoverflow_logo_icon.png" alt="로고이미지"></Img>
        </Logo>
        <FormContainer>
          <Form>
            <Label
              marginTop="calc(var(--su4) / 2)"
              marginBottom="calc(var(--su4) / 2)">
              Email
            </Label>
            <Input type="email"></Input>
          </Form>
          <Form>
            <LabelWrapper>
              <Label marginTop="calc(var(--su6) / 2)">Password</Label>
              <Caption href="#">Forgot password?</Caption>
            </LabelWrapper>
          </Form>
          <Input type="password"></Input>
          <Button>login</Button>
        </FormContainer>
        <GuideWrapper>
          Don’t have an account?&nbsp;
          <Caption href="#">Sign up</Caption>
        </GuideWrapper>
      </LoginWrapper>
    </LoginContainer>
  );
}

export default Login;
