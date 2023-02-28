import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [loginMemberId, setLoginMemberId] = useState(sessionStorage.getItem("memberId"));
  console.log(location)
  return (
    <QuestionComponent>
      <QuestionMain idValue={location.state.questionId} loginMemberId={loginMemberId}></QuestionMain>
      <AnswerMain idValue={location.state.questionId} loginMemberId={loginMemberId}></AnswerMain>
    </QuestionComponent>
  );
}

export default Question;
