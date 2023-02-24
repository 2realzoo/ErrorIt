import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "./commons/Container";
import Wrapper from "./commons/Wrapper";
import Notice from "./commons/Notice";
import FormContainer from "./commons/FormContainer";
import Form from "./commons/Form";
import Label from "./commons/Label";
import Input from "./commons/Input";
import Button from "./commons/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { memberId } from "../reducers/actions";

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

function CheckUser() {
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
  const handleSubmit = () => {
    if (!vaild.findQuestion) {
      alert("Please select a password-finding question.");
    } else {
      return axios
        .post("/api/members/password", userInfo)
        .then((res) => {
          dispatch(memberId(res.memberId));
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
          <Form>
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
          </Form>
          <Form>
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
          </Form>
          <Form>
            <Label htmlfor="findAnswer">Password Finding Answer</Label>
            <Input
              id="findAnswer"
              onChange={handleVaild}
              type="text"
              placeholder="type your answer"></Input>
            <Notice color="var(--fc-light)">
              This Question and Answer are used to find the password
            </Notice>
          </Form>
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
