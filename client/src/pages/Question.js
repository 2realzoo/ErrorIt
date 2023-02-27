import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AnswerMain from "../components/Question/AnswerMain";
import QuestionMain from "../components/Question/QuestionMain";

const QuestionComponent = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 50px auto;
  min-height: 100vh;
`;

function Question() {
  const location = useLocation();
  return (
    <QuestionComponent>
      <QuestionMain idValue={location.state.questionId}></QuestionMain>
      <AnswerMain idValue={location.state.questionId}></AnswerMain>
    </QuestionComponent>
  );
}

export default Question;
