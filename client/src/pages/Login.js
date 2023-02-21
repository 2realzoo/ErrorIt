import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { currentPage, isLogin } from "../reducers/actions";
import Container from "../styles/Container";
import Wrapper from "../styles/Wrapper";
import axios from "axios";

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

function Login() {
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(currentPage("Users"));
  }, []);

  const handleSubmit = () => {
    if (!loginInfo.email && loginInfo.password) {
      setErrorMessage("Please enter your ID.");
    } else if (loginInfo.email && !loginInfo.password) {
      setErrorMessage("Please enter your password.");
    } else if (!loginInfo.email && !loginInfo.password) {
      setErrorMessage("Please enter your ID and password.");
    }
    return axios
      .post("https://f84e-1-227-164-12.jp.ngrok.io/member/login", loginInfo)
      .then((res) => {
        dispatch(isLogin(true));
        setErrorMessage("");
      })
      .catch((err) => {
        setErrorMessage("login fail");
      });
  };
  const handleChange = (e) => {
    e.target.type === "email"
      ? setLoginInfo({ email: e.target.value, password: loginInfo.password })
      : setLoginInfo({
          email: loginInfo.email,
          password: e.target.value,
        });
  };
  // useEffect(() => {
  //   console.log(loginInfo);
  // }, [loginInfo]);

  return (
    <Container>
      <Wrapper pageName="Login">
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
            <Input type="email" onChange={handleChange}></Input>
          </Form>
          <Form>
            <LabelWrapper>
              <Label marginTop="calc(var(--su6) / 2)">Password</Label>
              <Caption href="/check-user">Forgot password?</Caption>
            </LabelWrapper>
            <Input type="password" onChange={handleChange}></Input>
          </Form>

          <Button onClick={handleSubmit}>login</Button>
        </FormContainer>
        <GuideWrapper>
          Don’t have an account?&nbsp;
          <Caption href="/signup">Sign up</Caption>
        </GuideWrapper>
      </Wrapper>
    </Container>
  );
}

export default Login;
