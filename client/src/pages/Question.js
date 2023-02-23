import React from "react";
import styled from "styled-components";
import AnswerMain from "../components/Question/AnswerMain";
import QuestionMain from "../components/Question/QuestionMain";

const QuestionComponent = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 50px auto;
  min-height: 100vh;
`

function Question() {
  return (
    <QuestionComponent>
      <QuestionMain></QuestionMain>
      <AnswerMain></AnswerMain>
    </QuestionComponent>
  );
}

export default Question;
