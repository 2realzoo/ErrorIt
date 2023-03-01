import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Detail from "./Detail";
import Button from "../../pages/commons/Button";
import LoginPopup from "../LoginPopup";

const AnswerMainContainer = styled.div`
  margin-top: 15px;
`;
const AnswerCount = styled.h2`
  margin: 60px 0 30px 0;
  font-size: 25px;
`;
const AddAnswerContainer = styled.div`
  margin-top: 20px;
`;
const AddAnswerTitle = styled.h2`
  font-size: 20px;
`;
const AddAnswerForm = styled.textarea`
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  height: 200px;
  border: 1px solid var(--black-100);
  border-radius: var(--br-sm);
`;
const ButtonContainer = styled.div`
  width: 130px;
`;

function AnswerMain({ idValue, loginMemberId ,rander ,setRander }) {
  const [answers, setAnswers] = useState([]);
  const [addanswerValue, setAddanswersValue] = useState("");
  const [isOpenLoginPopup, setIsOpenLoginPopup] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/questions/${idValue}/answers`,
      params: { sort: "latest" },
      headers: {
        "ngrok-skip-browser-warning": "12",
      },
    })
      .then((res) => {
        console.log(res.data);
        setAnswers(res.data);
      })
      .catch((err) => err);
  }, []);

  const answerValueHandler = (data) => {
    setAddanswersValue(data.target.value);
  };

  const addAnswerValueHandler = () => {
    if(addanswerValue.length < 1){
      alert("길이")
    }
    else if (loginMemberId) {
      axios
        .post(
          `/api/questions/${idValue}/answers`,
          {
            memberId: loginMemberId,
            content: addanswerValue,
          },
          {
            headers: {
              "ngrok-skip-browser-warning": "12",
              Authorization: localStorage.getItem("jwtToken"),
            },
          }
        )
        .then((res) => {
          const arr = [...answers, res.data];
          setAnswers(arr);
          setAddanswersValue('')
        })
        .catch((err) => err);
    } else {
      setIsOpenLoginPopup(true)
    }
  };

  return (
        <AnswerMainContainer>
          <AnswerCount>{answers.length} Answers</AnswerCount>
          {answers.map((el) => {
            return (
              <Detail
                data={el}
                answers={answers}
                setAnswers={setAnswers}
                QorA="answerId"
                idValue={idValue}
                loginMemberId={loginMemberId}
              ></Detail>
            );
          })}
          <AddAnswerContainer>
            <AddAnswerTitle>Your Answer</AddAnswerTitle>
            <AddAnswerForm
              value={addanswerValue}
              onChange={(data) => {
                answerValueHandler(data);
              }}
            ></AddAnswerForm>
            <ButtonContainer>
              <Button
                children="Post Your Answer"
                onClick={addAnswerValueHandler}
              ></Button>
            </ButtonContainer>
          </AddAnswerContainer>
          {isOpenLoginPopup ? <LoginPopup openLoginPopupHandler={()=>{setIsOpenLoginPopup(false)}}></LoginPopup>: null}
        </AnswerMainContainer>
  );
}

export default AnswerMain;
