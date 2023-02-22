import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import Detail from "../Detail";

const QuestionContainer = styled.div`
  padding: 24px;
  height: 100vh;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const QuestionTitle = styled.h1`
  font-size: 2rem;
`;
const Button = styled.button`
  top: 50%;
  right: 0;
`;

const SubAttribute = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  ul {
    display: flex;
    li {
      margin: 5px 10px 10px 0;
    }
  }
`;

function Questions() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useLayoutEffect(() => {
    axios
      .get("/api/questions/123123", {
        headers: { "ngrok-skip-browser-warning": "12" },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        setIsLoading(true);
      })
      .catch((err) => err);
  }, []);
  return (
    <QuestionContainer>
      {isLoading ? (
        <>
          <QuestionHeader>
            <QuestionTitle>{data.question?.title}</QuestionTitle>
            <Button>Ask Question</Button>
          </QuestionHeader>
          <SubAttribute>
            <ul>
              <li>Asked {new Date(data.question?.createAt).toDateString()}</li>
              <li>Modified {new Date(data.question?.modifiedAt).toDateString()}</li>
              <li>Viewed {data.question?.viewCount}</li>
            </ul>
            <hr />
          </SubAttribute>
          <Detail data={data}></Detail>
        </>
      ) : null}
    </QuestionContainer>
  );
}

export default Questions;
