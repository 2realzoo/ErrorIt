import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { currentPage, isLogin, userInfo } from "../reducers/actions";
import Container from "./commons/Container";
import Wrapper from "./commons/Wrapper";
import axios from "axios";
import FormContainer from "./commons/FormContainer";
import FormWrapper from "./commons/FormWrapper";
import Label from "./commons/Label";
import Input from "./commons/Input";
import Button from "./commons/Button";
import { useNavigate } from "react-router-dom";
import logo from "../asset/stackoverflow_logo_icon.png";
import Caption from "./commons/Caption";
import Redirect from "../util/Redirect";

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

function Login() {
  // useRedirect();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [loginInfo, setLoginInfo] = useState({
  //   email: "",
  //   password: "",
  // });
  const [errorMessage, setErrorMessage] = useState("");
  const { memberIdReducer, userInfoReducer } = useSelector((state) => state);
  const { email, password } = userInfoReducer;
  dispatch(currentPage("Users"));
  // console.log(memberIdReducer);
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    const regexp = new RegExp(/^[A-Za-z0-9]+@[a-z]+\.[a-z.]+$/);
    if (!email && password) {
      alert("Please enter your ID.");
    }
    if (!regexp.test(email)) {
      return alert("Fill it out in email format.");
    } else if (email && !password) {
      alert("Please enter your password.");
    } else if (!email && !password) {
      alert("Please enter your ID and password.");
    } else {
      return axios
        .post(
          "/api/login",
          { email, password },
          {
            headers: { "ngrok-skip-browser-warning": "12" },
          }
        )
        .then((res) => {
          dispatch(isLogin(true));
          setErrorMessage("");
          window.localStorage.setItem("jwtToken", res.headers.authorization);
          window.sessionStorage.setItem("memberId", res.data.memberId);
          window.sessionStorage.setItem("imageUri", res.data.imageUri);
          window.sessionStorage.setItem("email", email);
          // console.log(res);
          // dispatch(memberId(res.data.memberId));
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          setErrorMessage("login failed");
          alert("login failed");
          console.log(err);
        });
    }
  };

  const handleChange = (e) => {
    e.target.type === "email"
      ? dispatch(userInfo({ ...userInfoReducer, email: e.target.value }))
      : dispatch(userInfo({ ...userInfoReducer, password: e.target.value }));
  };

  return (
    <Container>
      <Wrapper pageName="Login">
        <Logo href="/">
          <Img src={logo} alt="로고이미지"></Img>
        </Logo>
        <FormContainer pageName="Login">
          <FormWrapper>
            <Label
              marginTop="calc(var(--su4) / 2)"
              marginBottom="calc(var(--su4) / 2)">
              Email
            </Label>
            <Input type="email" onChange={handleChange}></Input>
          </FormWrapper>
          <FormWrapper>
            <LabelWrapper>
              <Label marginTop="calc(var(--su6) / 2)">Password</Label>
              <Caption href="/check-user">Forgot password?</Caption>
            </LabelWrapper>
            <Input type="password" onChange={handleChange}></Input>
          </FormWrapper>
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
