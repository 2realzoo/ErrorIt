import React, { useEffect, useState } from "react";
import Container from "./commons/Container";
import Wrapper from "./commons/Wrapper";
import FormContainer from "./commons/FormContainer";
import FormWrapper from "./commons/FormWrapper";
import Label from "./commons/Label";
import Input from "./commons/Input";
import Button from "./commons/Button";
import Notice from "./commons/Notice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { currentPage } from "../reducers/actions";
import axios from "axios";

function ChangePassword() {
  const [pwdInfo, setPwdInfo] = useState({ pwd: "", confirmPw: "" });
  const [vaild, setVaild] = useState({ pwd: 1, confirmPw: 1 });
  const [informMessage, setInformMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentPage("Users"));
  }, []);

  const handleInputChange = (e) => {
    const regexp = new RegExp(/^(?=.+[A-Za-z])(?=.+\d)[A-Za-z\d]{8,}$/gm);
    switch (e.target.id) {
      case "newPassword":
        let pwdVailds = { pwd: "", confirmPw: "" };
        regexp.test(e.target.value)
          ? (pwdVailds.pwd = true)
          : (pwdVailds.pwd = false);
        if (vaild.confirmPw !== 1 && e.target.value !== pwdInfo.confirmPw) {
          pwdVailds.confirmPw = false;
        } else if (
          vaild.confirmPw !== 1 &&
          e.target.value === pwdInfo.confirmPw
        ) {
          pwdVailds.confirmPw = true;
        } else if (vaild.confirmPw === 1) {
          pwdVailds.confirmPw = 1;
        }
        setVaild({ ...vaild, ...pwdVailds });
        break;
      case "confirmPassword":
        pwdInfo.pwd === e.target.value
          ? setVaild({ ...vaild, confirmPw: true })
          : setVaild({ ...vaild, confirmPw: false });
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    let memberId = sessionStorage.getItem("memberId");
    e.preventDefault();
    return axios
      .patch(
        `/api/members/${memberId}/password`,
        { memberId, password: pwdInfo.pwd },
        {
          headers: {
            "ngrok-skip-browser-warning": "12",
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((res) => {
        navigate("/alert/change");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("time out! try again");
          navigate("/check-user");
        }
      });
  };
  return (
    <Container>
      <Wrapper>
        <FormContainer>
          <FormWrapper>
            <Label htmlfor="newPassword">New password</Label>
            <Input
              onChange={(e) => {
                setPwdInfo({ ...pwdInfo, pwd: e.target.value });
                handleInputChange(e);
              }}
              id="newPassword"
              type="password"></Input>
            <Notice color="var(--fc-light)">
              Passwords must contain at least eight characters, including at
              least 1 letter and 1 number.
            </Notice>
            {vaild.pwd ? (
              <></>
            ) : (
              <Notice color="red">
                Please fill it out according to the password form.
              </Notice>
            )}
          </FormWrapper>
          <FormWrapper>
            <Label htmlfor="confirmPassword">Confirm new password</Label>
            <Input
              onChange={handleInputChange}
              id="confirmPassword"
              type="password"></Input>
            {vaild.confirmPw ? (
              <></>
            ) : (
              <Notice color="red">
                New password and confirmation password are different. Please
                check your password.
              </Notice>
            )}
          </FormWrapper>
          {vaild.confirmPw && vaild.pwd ? (
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
