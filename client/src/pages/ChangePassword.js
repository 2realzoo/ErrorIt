import React from "react";
import Container from "../styles/Container";
import Wrapper from "../styles/Wrapper";
import FormContainer from "../styles/FormContainer";
import Form from "../styles/Form";
import Label from "../styles/Label";
import Input from "../styles/Input";

function ChangePassword() {
  return (
    <Container>
      <Wrapper>
        <FormContainer>
          <Form>
            <Label>New password</Label>
            <Input></Input>
          </Form>
          <Form>
            <Label>Confirm new password</Label>
            <Input></Input>
          </Form>
        </FormContainer>
      </Wrapper>
    </Container>
  );
}

export default ChangePassword;
