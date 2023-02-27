import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Detail from "./Detail";
import Button from "../../pages/commons/Button";

const AnswerMainContainer = styled.div`
  margin-top: 15px;
`;
const AnswerCount = styled.h2`
  font-size: 20px;
`;
const AddAnswerContainer = styled.div``;
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

function AnswerMain({ idValue }) {
  const [answers, setAnswers] = useState([]);
  const [addanswerValue, setAddanswersValue] = useState("");

  useEffect(() => {
    axios
      .get(`/api/questions/${idValue}/answers`, {
        headers: { "ngrok-skip-browser-warning": "12" },
      })
      .then((res) => {
        console.log(res.data);
        setAnswers(res.data.answers);
      })
      .catch((err) => err);
  }, []);
  console.log(answers);

  const addanswerValueHandler = (data) => {
    setAddanswersValue(data.target.value);
  };

  return (
    <AnswerMainContainer>
      <AnswerCount>{answers.length} Answers</AnswerCount>
      {answers.map((el) => {
        return <Detail data={el} QorA="answerId"></Detail>;
      })}
      <AddAnswerContainer>
        <AddAnswerTitle>Your Answer</AddAnswerTitle>
        <AddAnswerForm
          onChange={(data) => {
            addanswerValueHandler(data);
          }}
        ></AddAnswerForm>
        <ButtonContainer>
          <Button children="Post Your Answer"></Button>
        </ButtonContainer>
      </AddAnswerContainer>
    </AnswerMainContainer>
  );
}

export default AnswerMain;
