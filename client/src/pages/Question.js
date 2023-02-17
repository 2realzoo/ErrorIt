import React, { useState } from "react";
import styled from "styled-components"
import Detail from "../components/Detail";
import axios from "axios"


const QuestionContainer = styled.div`
  padding: 24px;
`

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const QuestionTitle = styled.h1`
  font-size: 2rem;
`
const Button = styled.button`
  top: 50%;
  right: 0;
`

const SubAttribute = styled.div`
  border-bottom: 1px solid rgba(0,0,0,0.2);
  ul{
    display: flex;
    li{
      margin:5px 10px 10px 0
    }
  }
`

function Question() {
  return (
    <QuestionContainer>
      <QuestionHeader>
        <QuestionTitle>Fixing IndexingError to clean the data</QuestionTitle>
        <Button>Ask Question</Button>
      </QuestionHeader>
      <SubAttribute>
        <ul>
          <li>Asked today</li>
          <li>Modified today</li>
          <li>Viewed 17 times</li>
        </ul>
        <hr/>
      </SubAttribute>
      
      <Detail></Detail>
    </QuestionContainer>
  )
}

export default Question;
