import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { currentPage } from "../reducers/actions";
import Container from "./commons/Container";
import Wrapper from "./commons/Wrapper";
import Notice from "./commons/Notice";
import FormContainer from "./commons/FormContainer";
import Form from "./commons/Form";
import Label from "./commons/Label";
import Input from "./commons/Input";
import Button from "./commons/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpTitle = styled.div`
  font-size: 1.3rem;
  max-width: calc(var(--s-step) * 3.3);
  text-align: center;
  margin-bottom: var(--su24);
  margin-left: auto;
  margin-right: auto;
`;
const Select = styled.select`
  margin: calc(var(--su4) / 2);
  margin-right: 0;
  margin-left: 0;
  padding: 0.3em 0.5em;
  border: 1px solid var(--bc-darker);
  border-radius: var(--br-sm);
  -webkit-appearance: auto;
  -moz-appearance: auto;
  appearance: auto;
  width: 100%;
`;
const LinkedWord = styled.a`
  color: var(--theme-link-color);
  cursor: pointer;
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

function SignUp() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    findQuestion: "",
    findAnswer: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPw, setConfirmPw] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(currentPage("Users"));
  }, []);
  const handleSignUp = (e) => {
    if (userInfo.name === "") {
      alert("Please fill out display name");
    }
    if (userInfo.findQuestion === "") {
      alert("Please select a password-finding question.");
      setTimeout(() => {
        e.target.focus();
      }, 100);
    } else {
      return axios
        .post("/member", userInfo)
        .then((res) => {
          setUserInfo({});
          setErrorMessage("");
        })
        .then(() => {
          navigate("/alert/change");
        })
        .catch((err) => {
          setErrorMessage("Sign up failed");
        });
    }
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
  const handlePasswordVaild = (e) => {
    const regexp = new RegExp(/^(?=.+[A-Za-z])(?=.+\d)[A-Za-z\d]{8,}$/gm);
    if (!regexp.test(e.target.value)) {
      alert("Please use the appropriate password pattern.");
      setTimeout(() => {
        e.target.focus();
      }, 100);
    }
  };
  const handleConfirmPassword = (e) => {
    if (e._reactName === "onChange") {
      userInfo.password === e.target.value
        ? setConfirmPw(true)
        : setConfirmPw(false);
    }
  };
  return (
    <Container pageName="SignUp">
      <Wrapper pageName="SignUp">
        <SignUpTitle>
          Create your Stack Overflow account. It’s free and only takes a minute.
        </SignUpTitle>
        <FormContainer>
          <Form>
            <Label htmlfor="displayName">Display name</Label>
            <Input
              type="text"
              id="displayName"
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }></Input>
          </Form>
          <Form>
            <Label htmlfor="emailAddress">Email</Label>
            <Input
              type="email"
              id="emailAddress"
              onBlur={handleEmailVaild}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }></Input>
          </Form>
          <Form>
            <Label htmlfor="password">Password</Label>
            <Input
              type="password"
              id="password"
              onBlur={handlePasswordVaild}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }></Input>
            <Notice color="var(--fc-light)">
              Passwords must contain at least eight characters, including at
              least 1 letter and 1 number.
            </Notice>
          </Form>
          <Form>
            <Label htmlfor="confirmPassword">Confirm password</Label>
            <Input
              type="password"
              id="confirmPassword"
              onChange={handleConfirmPassword}
              onBlur={handleConfirmPassword}></Input>
            {confirmPw ? (
              <></>
            ) : (
              <Notice color="red">
                Password and confirmation password must be same.
              </Notice>
            )}
          </Form>
          <Form>
            <Label htmlfor="findQuestion">Password Finding Question</Label>
            <Select
              id="findQuestion"
              onChange={(e) =>
                setUserInfo({ ...userInfo, findQuestion: e.target.value })
              }>
              <option defaultChecked value="">
                --Please choose an option--
              </option>
              <option value="가장 인상깊게 읽었던 책은?">
                가장 인상깊게 읽었던 책은?
              </option>
              <option value="자신의 보물 제 1호는?">
                자신의 보물 제 1호는?
              </option>
              <option value="가장 기억에 남는 선생님 성함은?">
                가장 기억에 남는 선생님 성함은?
              </option>
              <option value="다시 태어나면 되고 싶은 것은?">
                다시 태어나면 되고 싶은 것은?
              </option>
            </Select>
          </Form>
          <Form>
            <Label htmlfor="findAnswer">Password Finding Answer</Label>
            <Input
              type="text"
              id="findAnswer"
              placeholder="type your answer"
              onChange={(e) =>
                setUserInfo({ ...userInfo, findAnswer: e.target.value })
              }></Input>
            <Notice color="var(--fc-light)">
              This Question and Answer are used to find the password
            </Notice>
          </Form>
          {userInfo.findAnswer !== "" ? (
            <Button
              onClick={(e) => {
                handleSignUp(e);
              }}
              pageName="SignUp">
              Sign up
            </Button>
          ) : (
            <Button disabled pageName="SignUp">
              Sign up
            </Button>
          )}

          <Notice color="var(--fc-light)" marginTop="var(--su16)">
            By clicking “Sign up”, you agree to our{" "}
            <LinkedWord
              href="https://stackoverflow.com/legal/terms-of-service/public"
              target="_blank">
              terms of service
            </LinkedWord>
            ,{" "}
            <LinkedWord
              href="https://stackoverflow.com/legal/privacy-policy"
              target="_blank">
              privacy policy
            </LinkedWord>{" "}
            and
            <LinkedWord
              href="https://stackoverflow.com/legal/cookie-policy"
              target="_blank">
              cookie policy
            </LinkedWord>
          </Notice>
        </FormContainer>
        <GuideWrapper>
          Already have an account?&nbsp;
          <Caption href="/login">Log in</Caption>
        </GuideWrapper>
      </Wrapper>
    </Container>
  );
}

export default SignUp;
