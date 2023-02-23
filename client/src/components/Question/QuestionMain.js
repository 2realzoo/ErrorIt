import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Q from "./QuestionStyled";
import Detail from "./Detail";
import QuestionTitle from "../QuestionTitle";

function Questions() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
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
    <Q.QuestionContainer>
      {isLoading ? (
        <>
          <Q.QuestionHeader>
            <QuestionTitle TitleContents={data.question.title}></QuestionTitle>
          </Q.QuestionHeader>
          <Q.SubAttribute>
            <ul>
              <li>
                <span>Asked</span>{" "}
                {new Date(data.question.createAt).toDateString()}
              </li>
              <li>
                <span>Modified</span>{" "}
                {new Date(data.question.modifiedAt).toDateString()}
              </li>
              <li>
                <span>Viewed</span> {data.question.viewCount}
              </li>
            </ul>
          </Q.SubAttribute>
            <Detail QorA='questionId' data={data}></Detail>
        </>
      ) : null}
    </Q.QuestionContainer>
  );
}

export default Questions;
