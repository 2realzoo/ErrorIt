import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Q from "./QuestionStyled";
import Detail from "./Detail";
import QuestionTitle from "../QuestionTitle";

function Questions({ idValue, loginMemberId }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [questionTitleValue, setquestionTitleValue] = useState("");
  const [editQuestionTitle, setEditQuestionTitle] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0 });
    axios
      .get(`/api/questions/${idValue}`, {
        headers: { "ngrok-skip-browser-warning": "12" },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        setIsLoading(true);
        setquestionTitleValue(res.data.title);
      })
      .catch((err) => err);
  }, []);
  const questionTitleValueHandler = (e) => {
    setquestionTitleValue(e.target.value);
  };
  return (
    <Q.QuestionContainer>
      {isLoading ? (
        <>
          <Q.QuestionHeader>
            {editQuestionTitle ? (
              <Q.QuestionTitleTextArea
                value={questionTitleValue}
                onChange={(e) => {
                  questionTitleValueHandler(e);
                }}
              ></Q.QuestionTitleTextArea>
            ) : (
              <QuestionTitle TitleContents={data.title}></QuestionTitle>
            )}
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
            setEditQuestionTitle={setEditQuestionTitle}
            questionTitleValue={questionTitleValue}
            setData={setData}
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
