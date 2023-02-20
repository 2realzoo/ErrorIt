import React from "react";
import styled from "styled-components";

const SignUpContainer = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 auto;
  background-color: var(--black-050);
  height: 100%;
  padding: var(--su24);
  padding-left: var(--su16);
  padding-right: var(--su16);
`;
const SignUpTitle = styled.div`
  font-size: 1.3rem;
  max-width: calc(var(--s-step) * 3.3);
  text-align: center;
  margin-bottom: var(--su24);
  margin-left: auto;
  margin-right: auto;
`;
const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-shrink: 0;
`;
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
const Form = styled.div`
  margin: calc(var(--su12) / 2);
  margin-right: 0;
  margin-left: 0;
  display: flex;
  flex-direction: column;
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
const Notice = styled.div`
  color: var(--fc-light);
  font-size: var(--fs-caption);
  margin-bottom: var(--su4);
  margin-top: var(--su4);
  clear: both;
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
  return (
    <SignUpContainer>
      <SignUpWrapper>
        <SignUpTitle>
          Create your Stack Overflow account. It’s free and only takes a minute.
        </SignUpTitle>
        <FormContainer>
          <Form>
            <Label>Display name</Label>
            <Input type="text"></Input>
          </Form>
          <Form>
            <Label>Email</Label>
            <Input type="email"></Input>
          </Form>
          <Form>
            <Label>Password</Label>
            <Input type="password"></Input>
          </Form>
          <Form>
            <Label>Confirm password</Label>
            <Input type="password"></Input>{" "}
            <Notice>
              Passwords must contain at least eight characters, including at
              least 1 letter and 1 number.
            </Notice>
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
            <Notice>
              This Question and Answer are used to find the password
            </Notice>
          </Form>
          <Button>Sign up</Button>
          <Notice>
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
          Don’t have an account?&nbsp;
          <Caption href="#">Sign up</Caption>
        </GuideWrapper>
      </SignUpWrapper>
    </SignUpContainer>
  );
}

export default SignUp;
