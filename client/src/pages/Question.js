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
  const [idValue, setIdValue] = useState(location.state.questionId)
  const [loginMemberId, setLoginMemberId] = useState(sessionStorage.getItem("memberId"));
  const [rander, setRander] = useState(true)
  console.log(location)
  return (
    <QuestionComponent>
      <QuestionMain rander={rander} setRander={setRander} idValue={idValue} loginMemberId={loginMemberId}></QuestionMain>
      <AnswerMain rander={rander} setRander={setRander} idValue={idValue} loginMemberId={loginMemberId}></AnswerMain>
    </QuestionComponent>
  );
}

export default Question;
