import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Q from "./QuestionStyled";
import Detail from "./Detail";
import QuestionTitle from "../QuestionTitle";

function Questions({ idValue, loginMemberId }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`/api/questions/${idValue}`, {
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
            <QuestionTitle TitleContents={data.title}></QuestionTitle>
          </Q.QuestionHeader>
          <Q.SubAttribute>
            <ul>
              <li>
                <span>Asked</span> {new Date(data.createdAt).toDateString()}
              </li>
              <li>
                <span>Modified</span> {new Date(data.modifiedAt).toDateString()}
              </li>
              <li>
                <span>Viewed</span> {data.viewCount}
              </li>
            </ul>
          </Q.SubAttribute>
          <Detail
            QorA="questionId"
            idValue={idValue}
            data={data}
            loginMemberId={loginMemberId}
          ></Detail>
        </>
      ) : null}
    </Q.QuestionContainer>
  );
}

export default Questions;
