import React from "react";
import styled from "styled-components";
import Container from "../styles/Container";
import Wrapper from "../styles/Wrapper";
import Notice from "../styles/Notice";

const FormContainer = styled.div`
  box-shadow: var(--bs-xl);
  padding: var(--su24);
  margin-bottom: var(--su24);
  margin-left: auto;
  margin-right: auto;
  background-color: var(--white);
  border-radius: var(--br-lg);
  max-width: 20rem;
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
              <option value="">--Please choose an option--</option>
              <option>질문1</option>
            </Select>
          </Form>
          <Form>
            <Label>Password Finding Answer</Label>
            <Input type="text" placeholder="type your answer"></Input>
            <Notice color="var(--fc-light)">
              This Question and Answer are used to find the password
            </Notice>
          </Form>
          <Button>Submit</Button>
        </FormContainer>
      </Wrapper>
    </Container>
  );
}

export default CheckUser;
