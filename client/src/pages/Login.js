import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { currentPage, isLogin } from "../reducers/actions";
import Container from "./commons/Container";
import Wrapper from "./commons/Wrapper";
import axios from "axios";
import FormContainer from "./commons/FormContainer";
import Form from "./commons/Form";
import Label from "./commons/Label";
import Input from "./commons/Input";
import Button from "./commons/Button";
import { useNavigate } from "react-router-dom";
import logo from "../asset/stackoverflow_logo_icon.png";
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
  const navigate = useNavigate();
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
      alert("Please enter your ID.");
    } else if (loginInfo.email && !loginInfo.password) {
      alert("Please enter your password.");
    } else if (!loginInfo.email && !loginInfo.password) {
      alert("Please enter your ID and password.");
    } else {
      return axios
        .post("https://f84e-1-227-164-12.jp.ngrok.io/member/login", loginInfo)
        .then((res) => {
          dispatch(isLogin(true));
          setErrorMessage("");
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          setErrorMessage("login failed");
          alert("login failed");
        });
    }
  };

  useEffect(() => {
    console.log(errorMessage);
  }, [errorMessage]);

  const handleChange = (e) => {
    e.target.type === "email"
      ? setLoginInfo({ ...loginInfo, email: e.target.value })
      : setLoginInfo({
          ...loginInfo,
          password: e.target.value,
        });
  };
  const handleEmailVaild = (e) => {
    const regexp = new RegExp("[A-Za-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!regexp.test(e.target.value)) {
      alert("Fill it out in email format.");
      setTimeout(() => {
        e.target.focus();
      }, 100);
    }
  };

  return (
    <Container>
      <Wrapper pageName="Login">
        <Logo href="/">
          <Img src={logo} alt="로고이미지"></Img>
        </Logo>
        <FormContainer pageName="Login">
          <Form>
            <Label
              marginTop="calc(var(--su4) / 2)"
              marginBottom="calc(var(--su4) / 2)">
              Email
            </Label>
            <Input
              type="email"
              onChange={handleChange}
              onBlur={handleEmailVaild}></Input>
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
