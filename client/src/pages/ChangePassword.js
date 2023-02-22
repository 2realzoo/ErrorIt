import React, { useEffect, useState } from "react";
import Container from "./commons/Container";
import Wrapper from "./commons/Wrapper";
import FormContainer from "./commons/FormContainer";
import Form from "./commons/Form";
import Label from "./commons/Label";
import Input from "./commons/Input";
import Button from "./commons/Button";
import Notice from "./commons/Notice";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [informMessage, setInformMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    e.target.id === "new-password"
      ? setPasswords({
          newPassword: e.target.value,
          confirmPassword: passwords.confirmPassword,
        })
      : setPasswords({
          newPassword: passwords.newPassword,
          confirmPassword: e.target.value,
        });
  };

  useEffect(() => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setInformMessage(
        "New password and confirmation password are different. Please check your password."
      );
    } else {
      setInformMessage("");
    }
  }, [passwords]);

  const handleSubmit = () => {
    navigate("/change-password/alert-change");
  };
  return (
    <Container>
      <Wrapper>
        <FormContainer>
          <Form>
            <Label for="newPassword">New password</Label>
            <Input
              onChange={handleInputChange}
              id="newPassword"
              type="password"></Input>
            <Notice color="var(--fc-light)">
              Passwords must contain at least eight characters, including at
              least 1 letter and 1 number.
            </Notice>
          </Form>
          <Form>
            <Label for="confirmPassword">Confirm new password</Label>
            <Input
              onChange={handleInputChange}
              id="confirmPassword"
              type="password"></Input>
            {informMessage.length > 0 ? (
              <Notice color="red">{informMessage}</Notice>
            ) : (
              <></>
            )}
          </Form>
          {informMessage.length === 0 ? (
            <Button onClick={handleSubmit} pageName="ChangePassword">
              Submit
            </Button>
          ) : (
            <Button disabled pageName="ChangePassword">
              Submit
            </Button>
          )}
        </FormContainer>
      </Wrapper>
    </Container>
  );
}

export default ChangePassword;
