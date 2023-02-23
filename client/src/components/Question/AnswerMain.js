import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Detail from "../Detail";

const AnswerMainContainer = styled.div`
  margin-top: 15px;
`;
const AnswerCount = styled.h2`
  font-size: 20px;
`;

function AnswerMain() {
  const [answers, setAnswers] = useState([])
  useEffect(() => {
    axios
      .get("/api/questions/123123/answers", {
        headers: { "ngrok-skip-browser-warning": "12" },
      })
      .then((res) => {
        console.log(res.data);
        setAnswers(res.data.answers)
      })
      .catch((err) => err);
  }, []);
  console.log(answers)
  return (
    <AnswerMainContainer>
      <AnswerCount>{answers.length} Answers</AnswerCount>
      {answers.map(el =>{
        return(
          <Detail data={answers} QorA='answerId'></Detail>
        )
      })}
    </AnswerMainContainer>
  );
}

export default AnswerMain;
