import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "./commons/Container";
import Wrapper from "./commons/Wrapper";
import Notice from "./commons/Notice";
import FormContainer from "./commons/FormContainer";
import FormWrapper from "./commons/FormWrapper";
import Label from "./commons/Label";
import Input from "./commons/Input";
import Button from "./commons/Button";
import axios from "axios";
import Select from "./commons/Select";
import { useDispatch } from "react-redux";
import { currentPage } from "../reducers/actions";
import useRedirect from "../util/useRedirect";

function CheckUser() {
  // useRedirect();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    findQuestion: "",
    finAnswer: "",
  });
  const [vaild, setVaild] = useState({
    email: 1,
    findQuestion: 1,
    findAnswer: 1,
  });
  const dispatch = useDispatch();
  dispatch(currentPage("Users"));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vaild.findQuestion) {
      alert("Please select a password-finding question.");
    } else {
      return axios
        .post("/api/members/password", userInfo)
        .then((res) => {
          console.log(res);
          localStorage.setItem("jwtToken", res.headers.authorization);
          sessionStorage.setItem("memberId", res.data.memberId);
          navigate("/change-password");
        })
        .catch((err) => {
          alert("user check failed");
        });
    }
  };
  const handleVaild = (e) => {
    let regexp;
    switch (e.target.id) {
      case "emailAddress":
        regexp = new RegExp(/^[A-Za-z0-9]+@[a-z]+\.[a-z.]+$/);
        regexp.test(e.target.value)
          ? setVaild({ ...vaild, email: true })
          : setVaild({ ...vaild, email: false });
        break;
      case "findQuestion":
        e.target.value === ""
          ? setVaild({ ...vaild, findQuestion: false })
          : setVaild({ ...vaild, findQuestion: true });
        break;
      case "findAnswer":
        e.target.value === ""
          ? setVaild({ ...vaild, findAnswer: false })
          : setVaild({ ...vaild, findAnswer: true });
        break;
      default:
        return;
    }
  };
  return (
    <Container>
      <Wrapper pageName="CheckUser">
        <FormContainer>
          <Notice>
            Forgot your account’s password?Please answer the email and the
            questions you chose when signing up. You can change your password.
          </Notice>
          <FormWrapper>
            <Label htmlfor="emailAddress">Email</Label>
            <Input
              onChange={(e) => {
                handleVaild(e);
                setUserInfo({ ...userInfo, email: e.target.value });
              }}
              id="emailAddress"></Input>
            {vaild.email ? (
              <></>
            ) : (
              <Notice color="red">
                Please fill it out according to the email form.
              </Notice>
            )}
          </FormWrapper>
          <FormWrapper>
            <Label htmlfor="findQuestion">Password Finding Question</Label>
            <Select onChange={handleVaild} id="findQuestion">
              <option defaultChecked value="">
                --Please choose an option--
              </option>
              <option>가장 인상깊게 읽었던 책은?</option>
              <option>자신의 보물 제 1호는?</option>
              <option>가장 기억에 남는 선생님 성함은?</option>
              <option>다시 태어나면 되고 싶은 것은?</option>
            </Select>
          </FormWrapper>
          <FormWrapper>
            <Label htmlfor="findAnswer">Password Finding Answer</Label>
            <Input
              id="findAnswer"
              onChange={handleVaild}
              type="text"
              placeholder="type your answer"></Input>
            <Notice color="var(--fc-light)">
              This Question and Answer are used to find the password
            </Notice>
          </FormWrapper>
          {vaild.email &&
          vaild.email !== 1 &&
          vaild.findAnswer &&
          vaild.findAnswer !== 1 ? (
            <Button onClick={handleSubmit} pageName="CheckUser">
              Submit
            </Button>
          ) : (
            <Button pageName="CheckUser" disabled>
              Submit
            </Button>
          )}
        </FormContainer>
      </Wrapper>
    </Container>
  );
}

export default CheckUser;
