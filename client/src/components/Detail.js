import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoginPopup from "./LoginPopup";
import Comment from "./Comment";
import axios from "axios";

const DetailContainer = styled.div`
  margin-top: 10px;
  display: flex;
`;
const QuestionDetail = styled.div`
  font-size: medium;
`;
const SideMenu = styled.div`
  width: 55px;
  padding-right: 16px;
`;
const MainMenu = styled.div`
  width: 100%;
`;
const UserBoxContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
const UserAddOn = styled.div`
  font-size: small;
  margin: 10px 0;
  color: var(--black-300);
  li {
    display: inline;
    margin-right: 5px;
  }
`;
const UserInfoConainer = styled.div`
  margin: 10px 0 30px 0;
  display: flex;
`;
const UserInfo = styled.div`
  width: 200px;
  background-color: var(--blue-100);
  border-radius: var(--br-sm);
  padding: 5px 6px 7px 7px;
`;
const CreatedAt = styled.div`
  font-size: small;
  color: var(--black-200);
`;
const CommentAddBtn = styled.button`
  color: var(--black-200);
  margin-top: 10px;
`;
const AddCommentContainer = styled.div`
  display: flex;
`;

const AddCommentForm = styled.textarea`
  margin-top: 10px;
  padding: 10px;
  width: 93%;
  height: 60px;
  border: 1px solid var(--black-100);
  border-radius: var(--br-sm);
`;

const SubmitCommentBtn = styled.button`
  margin-left: 5px;
  margin-top: 10px;
  text-align: center;
  height: 60px;
  border: 1px solid var(--black-100);
  border-radius: var(--br-sm);
  padding: 5px;
`;

function Detail({ QorA, data }) {
  const [isOpenLoginPopup, setisOpenLoginPopup] = useState(false);
  const [isOpenCommentForm, setIsOpenCommentForm] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const userAddOnArr = ["Share", "Edit", "Follow"];
  console.log(data.comments);
  const openLoginPopupHandler = () => {
    setisOpenLoginPopup(!isOpenLoginPopup);
  };
  const openCommentHandler = () => {
    setIsOpenCommentForm(!isOpenCommentForm);
  };
  const commentValueHandler = (e) => {
    setCommentValue(e.target.value);
  };
  const commentSubmitHandler = () => {
    axios
      .post(
        "/api/questions/123123/answers",
        {
          memberId: 123123,
          content: commentValue,
        },
        {
          headers: { "ngrok-skip-browser-warning": "12" },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => err);
  };
  console.log(commentValue);

  return (
    <DetailContainer key={data.question.QorA}>
      <SideMenu />
      <MainMenu>
        <QuestionDetail>{data.question.content}</QuestionDetail>
        <UserBoxContainer>
          <UserAddOn>
            <ul>
              {userAddOnArr.map((el) => {
                return <li onClick={openLoginPopupHandler}>{el}</li>;
              })}
            </ul>
          </UserAddOn>
          <UserInfoConainer>
            <UserInfo>
              <CreatedAt>
                asked {new Date(data.question.createAt).toDateString()}
              </CreatedAt>
            </UserInfo>
          </UserInfoConainer>
        </UserBoxContainer>
        {data.comments.map((el) => {
          return <Comment comments={el}></Comment>;
        })}
        {isOpenCommentForm ? (
          <AddCommentContainer>
            <AddCommentForm
              value={commentValue}
              onChange={(e) => commentValueHandler(e)}
              placeholder="Enter Your Commnet"
            />
            <SubmitCommentBtn
              onClick={() => {
                commentSubmitHandler();
                openCommentHandler();
              }}
            >
              Submit
            </SubmitCommentBtn>
          </AddCommentContainer>
        ) : (
          <CommentAddBtn onClick={openCommentHandler}>
            Add a comment
          </CommentAddBtn>
        )}
        {isOpenLoginPopup ? (
          <LoginPopup
            openLoginPopupHandler={openLoginPopupHandler}
          ></LoginPopup>
        ) : null}
      </MainMenu>
    </DetailContainer>
  );
}

export default Detail;
