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
import { AiFillCheckCircle } from "react-icons/ai";

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
const EmailBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  .check-icon {
    color: green;
    font-size: 1.1rem;
  }
`;
const EmailCheckBtn = styled.button`
  border: 1px solid hsl(205, 41%, 63%);
  border-radius: 3px;
  align-self: center;
  background-color: hsl(205, 46%, 92%);
  font-size: 0.75rem;
  padding: 0.3rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.7);
  margin-left: 0.5rem;
  margin-top: 2px;
  margin-bottom: 2px;
  cursor: pointer;
  &:hover {
    background-color: var(--_bu-filled-bg-hover);
  }
`;

function SignUp() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPw: "",
    findQuestion: "",
    findAnswer: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [vaild, setVaild] = useState({
    name: 1,
    email: 1,
    password: 1,
    confirmPw: 1,
    findQuestion: 1,
    findAnswer: 1,
  });
  const [emailCheck, setEmailCheck] = useState(false);
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
          alert("Sign up failed");
        });
    }
  };
  const handleVaild = (e) => {
    let regexp;
    switch (e.target.id) {
      case "emailAddress":
        regexp = new RegExp(/^[A-Za-z0-9]+@[a-z]+\.[a-z.]+$/);
        if (emailCheck === true) {
          setEmailCheck(false);
        }
        !regexp.test(e.target.value)
          ? setVaild({ ...vaild, email: false })
          : setVaild({ ...vaild, email: true });
        break;
      case "password":
        regexp = new RegExp(/^(?=.+[A-Za-z])(?=.+\d)[A-Za-z\d]{8,}$/gm);
        !regexp.test(e.target.value)
          ? setVaild({ ...vaild, password: false })
          : setVaild({ ...vaild, password: true });
        if (vaild.confirmPw !== 1 && e.target.value !== userInfo.confirmPw) {
          setVaild({ ...vaild, confirmPw: false });
        } else if (
          vaild.confirmPw !== 1 &&
          e.target.value === userInfo.confirmPw
        ) {
          setVaild({ ...vaild, confirmPw: true });
        }
        break;
      case "confirmPassword":
        userInfo.password === e.target.value
          ? setVaild({ ...vaild, confirmPw: true })
          : setVaild({ ...vaild, confirmPw: false });
        break;
      default:
        return;
    }
  };

  // useEffect(() => {
  //   console.log(userInfo);
  // }, [vaild]);

  const onDuplicationCheck = () => {
    return axios
      .post("api/members/password", {
        email: userInfo.email,
      })
      .then((res) => {
        setEmailCheck(res.data.canUse);
      })
      .catch((err) => {
        console.log(err);
        alert("duplicatation check failed!");
      });
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
            <EmailBox>
              <Label htmlfor="emailAddress">Email</Label>
              {emailCheck ? (
                <AiFillCheckCircle className="check-icon" />
              ) : (
                <EmailCheckBtn onClick={onDuplicationCheck}>
                  Duplicate check
                </EmailCheckBtn>
              )}
            </EmailBox>
            <Input
              type="email"
              id="emailAddress"
              onBlur={handleVaild}
              onChange={(e) => {
                setUserInfo({ ...userInfo, email: e.target.value });
                handleVaild(e);
              }}></Input>

            {vaild.email ? (
              <></>
            ) : (
              <Notice color="red">
                Please fill it out according to the email form.
              </Notice>
            )}
          </Form>
          <Form>
            <Label htmlfor="password">Password</Label>
            <Input
              type="password"
              id="password"
              onChange={(e) => {
                setUserInfo({ ...userInfo, password: e.target.value });
                handleVaild(e);
              }}></Input>
            {vaild.password ? (
              <></>
            ) : (
              <Notice color="red">
                Please fill it out according to the password form.
              </Notice>
            )}
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
              onChange={(e) => {
                setUserInfo({ ...userInfo, confirmPw: e.target.value });
                handleVaild(e);
              }}></Input>
            {vaild.confirmPw ? (
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
          {userInfo.findAnswer !== "" &&
          vaild.email !== 1 &&
          vaild.email &&
          vaild.password &&
          vaild.password !== 1 &&
          vaild.confirmPw &&
          vaild.confirmPw !== 1 ? (
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
