import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "../styles/Container";
import Wrapper from "../styles/Wrapper";
import Notice from "../styles/Notice";
import FormContainer from "../styles/FormContainer";
import Form from "../styles/Form";
import Label from "../styles/Label";
import Input from "../styles/Input";

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

function CheckUser() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/change-password");
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
            <Label>Email</Label>
            <Input></Input>
          </Form>
          <Form>
            <Label>Password Finding Question</Label>
            <Select>
              <option defaultChecked>--Please choose an option--</option>
              <option>가장 인상깊게 읽었던 책은?</option>
              <option>자신의 보물 제 1호는?</option>
              <option>가장 기억에 남는 선생님 성함은?</option>
              <option>다시 태어나면 되고 싶은 것은?</option>
            </Select>
          </Form>
          <Form>
            <Label>Password Finding Answer</Label>
            <Input type="text" placeholder="type your answer"></Input>
            <Notice color="var(--fc-light)">
              This Question and Answer are used to find the password
            </Notice>
          </Form>
          <Button onClick={handleSubmit}>Submit</Button>
        </FormContainer>
      </Wrapper>
    </Container>
  );
}

export default CheckUser;
