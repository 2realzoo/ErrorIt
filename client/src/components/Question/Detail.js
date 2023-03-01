import React, { useState } from "react";
import styled from "styled-components";
import LoginPopup from "../LoginPopup";
import Comment from "../Comment";
import axios from "axios";
import {
  BsBookmarkCheck,
  BsFillCaretUpFill,
  BsFillCaretDownFill,
  BsArrowCounterclockwise,
  BsXLg,
} from "react-icons/bs";
import Button from "../../pages/commons/Button";
import axiosCall from "../../util/axiosCall";
import Refresh from "../../util/Refresh";
import { useNavigate } from "react-router-dom";

const DetailContainer = styled.div`
  margin-top: ${(props) => props.marginTop};
  padding-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
`;
const QuestionDetail = styled.div`
  margin-top: 30px;
  min-height: 100px;
  font-size: medium;
  white-space: pre-wrap;
`;

const SideMenu = styled.div`
  width: 55px;
  padding-right: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  color: var(--black-300);
  > * {
    margin-top: 20px;
  }
`;
const RecoContianer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 35px;
  > b {
    color: var(--black);
    font-size: 25px;
  }
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
  display: flex;
  align-items: flex-end;
  ul {
    margin-bottom: 20px;
  }
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
  background-color: ${(props) => props.backG};
  border-radius: var(--br-sm);
  padding: 5px 6px 7px 7px;
`;
const UserName = styled.div`
  margin: 2px 10px 0 0;
  text-align: end;
  font-weight: 500;
  color: var(--black-500);
`;

const CreatedAt = styled.div`
  font-size: small;
  color: var(--black-200);
`;
const CommentAddBtn = styled.button`
  font-size: 15px;
  color: var(--black-200);
  margin: 10px 0 39px 0;
  color: var(--blue);
  :hover{
    color: var(--blue-300);
  }
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
const EditContentContainer = styled.div`
  min-height: 100px;
`;

const EditContentTextArea = styled.textarea`
  border-radius: var(--br-sm);
  min-height: 100px;
  border: 1px solid var(--black-200);
  padding: 10px;
  width: 100%;
`;

const EditContentBtnArea = styled.div`
  width: 80px;
  display: flex;
  button {
    margin-right: 10px;
    width: 100px;
  }
  button + button {
    background-color: white;
    color: var(--blue);
    border: 1px solid var(--blue);
  }
`;

const DeleteBtn = styled.button`
  color: var(--black-300);
`;

function Detail({
  QorA,
  data,
  idValue,
  loginMemberId,
  setData=()=>{},
  questionTitleValue,
  setEditQuestionTitle = () => {},
  answers,
  setAnswers,
}) {
  const [isOpenLoginPopup, setisOpenLoginPopup] = useState(false);
  const [isOpenCommentForm, setIsOpenCommentForm] = useState(false);
  const [isOpenEditContent, setIsOpenEditContent] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [questionContentValue, setQuestionContentValue] = useState(
    data.content
  );
  const [overCount, setOverCount] = useState(5);
  const [isOverfive, setisOverFive] = useState(data.comments.length>5)
  const navigate = useNavigate();
  if (QorA === "answerId") {
    idValue = data.answerId;
  }
  const openLoginPopupHandler = () => {
    if (loginMemberId) {
    } else {
      setisOpenLoginPopup(!isOpenLoginPopup);
    }
  };
  const openCommentHandler = () => {
    if (loginMemberId) {
      setIsOpenCommentForm(true);
    } else {
    }
  };

  const commentValueHandler = (e) => {
    setCommentValue(e.target.value);
  };

  const commentSubmitHandler = async () => {
    if (commentValue.length <= 0) {
      alert("1글자 이상의 내용을 입력해주세요");
    } else {
      const reqUrl = QorA === "questionId" ? "questions" : "answers";
      let result = await axiosCall(
        `/api/${reqUrl}/${idValue}/comments`,
        "POST",
        {
          memberId: loginMemberId,
          content: commentValue,
        }
      );
      while (result.response && result.response.data.status === 401) {
        await Refresh();
        result = await axiosCall(`/api/${reqUrl}/${idValue}/comments`, "POST", {
          memberId: loginMemberId,
          content: commentValue,
        });
      }
      if (result.status === 201) {
        const obj = Object.assign({}, data);
        obj.comments.push(result.data);
        console.log(obj);
        setData(obj);
        setCommentValue("");
        setIsOpenCommentForm(false);
        return;
      }
      return result;
    }
  };

  const editContentHandler = () => {
    console.log(+loginMemberId, data.ownerId);
    if (+loginMemberId === data.ownerId) {
      setIsOpenEditContent(true);
      setEditQuestionTitle(true);
    } else if (loginMemberId) {
      alert("다른 사람의 계시물은 수정할 수 없습니다.");
    } else {
      setisOpenLoginPopup(true);
    }
  };

  const contentValueHandler = (e) => {
    console.log(questionContentValue);
    console.log(e.target.scrollHeight);
    console.log(e.target.style.height);
    e.target.style.height = e.target.scrollHeight + "px";
    setQuestionContentValue(e.target.value);
  };

  const EditContentBtnHandler = async () => {
    const reqUrl = QorA === "questionId" ? "questions" : "answers";
    let result = await axiosCall(`/api/${reqUrl}/${idValue}`, "PATCH", {
      memberId: loginMemberId,
      title: questionTitleValue,
      content: questionContentValue,
    });
    while (result.response && result.response.data.status === 401) {
      await Refresh();
      result = await axiosCall(`/api/${reqUrl}/${idValue}`, "PATCH", {
        memberId: loginMemberId,
        title: questionTitleValue,
        content: questionContentValue,
      });
    }
    if (result.status === 200) {
      data.content = questionContentValue;
      setIsOpenEditContent(false);
      return;
    }
    return result;
  };

  const onBlurHandler = () => {
    if (commentValue === "") {
      setIsOpenCommentForm(false);
    }
  };

  const deleteHandler = async () => {
    console.log(loginMemberId);
    // eslint-disable-next-line no-restricted-globals
    const askDelete = confirm("정말로 삭제 하시겠습니까?");
    if (!askDelete) {
    } else {
      const reqUrl = QorA === "questionId" ? "questions" : "answers";
      let result = await axiosCall(`/api/${reqUrl}/${idValue}`, "DELETE");
      while (result.response && result.response.data.status === 401) {
        await Refresh();
        result = await axiosCall(`/api/${reqUrl}/${idValue}`, "DELETE");
      }
      if (result.status === 200) {
        if (QorA === "questionId") {
          navigate("/");
        } else {
          const arr = [...answers].filter(
            (e) => e.answerId !== result.data.deletedAnswerId
          );
          setAnswers(arr);
        }
        return;
      }
      return result;
    }
  };
  console.log(data)
  return (
    <>
      <DetailContainer
        key={data.QorA}
        marginTop={QorA === "questionId" ? "0" : "30px"}
      >
        <SideMenu>
          <RecoContianer>
            <BsFillCaretUpFill />
            <b>0</b>
            <BsFillCaretDownFill />
          </RecoContianer>
          <BsBookmarkCheck />
          <BsArrowCounterclockwise />
          {+loginMemberId === data.ownerId ? (
            <DeleteBtn>
              <BsXLg onClick={deleteHandler} />
            </DeleteBtn>
          ) : null}
        </SideMenu>
        <MainMenu>
          <QuestionDetail>
            {isOpenEditContent ? (
              <EditContentContainer>
                <EditContentTextArea
                  value={questionContentValue}
                  onChange={(e) => {
                    contentValueHandler(e);
                  }}
                ></EditContentTextArea>
              </EditContentContainer>
            ) : (
              data.content
            )}
          </QuestionDetail>
          <UserBoxContainer>
            <UserAddOn>
              <ul>
                <li onClick={openLoginPopupHandler}>Share</li>
                <li onClick={editContentHandler}>Edit</li>
                <li onClick={openLoginPopupHandler}>Follow</li>
              </ul>
            </UserAddOn>
            <UserInfoConainer>
              <UserInfo
                backG={QorA === "questionId" ? "var(--blue-100)" : "white"}
              >
                <CreatedAt>
                  asked {new Date(data.createdAt).toDateString()}
                </CreatedAt>
                <UserName>{data.ownerName}</UserName>
              </UserInfo>
            </UserInfoConainer>
          </UserBoxContainer>
          {data.comments.map((el, index) => {
            if(!isOverfive || index < overCount){
              return <Comment comments={el} data={data} setData={setData} loginMemberId={loginMemberId}></Comment>
            }
            return ;
          })}
          {isOpenCommentForm ? (
            <AddCommentContainer>
              <AddCommentForm
                onBlur={onBlurHandler}
                value={commentValue}
                onChange={(e) => commentValueHandler(e)}
                placeholder="Enter Your Comment"
              />
              <SubmitCommentBtn
                onClick={() => {
                  commentSubmitHandler();
                }}
              >
                Submit
              </SubmitCommentBtn>
            </AddCommentContainer>
          ) : isOverfive ? (
            <CommentAddBtn
              onClick={() => {
                setOverCount(data.comments.length)
                setisOverFive(false)
              }}
            >
              see {data.comments.length-5} more comments
            </CommentAddBtn>
          ) :(
            <CommentAddBtn
              onClick={() => {
                openCommentHandler();
                openLoginPopupHandler();
              }}
            >
              Add a comment
            </CommentAddBtn>
          ) }
          {isOpenLoginPopup ? (
            <LoginPopup
              openLoginPopupHandler={openLoginPopupHandler}
            ></LoginPopup>
          ) : null}
          {isOpenEditContent ? (
            <EditContentBtnArea>
              <Button
                children={"Edit"}
                onClick={EditContentBtnHandler}
              ></Button>
              <Button
                children={"cancel"}
                onClick={() => {
                  setIsOpenEditContent(false);
                  setEditQuestionTitle(false);
                  setQuestionContentValue(data.content);
                }}
              ></Button>
            </EditContentBtnArea>
          ) : null}
        </MainMenu>
      </DetailContainer>
    </>
  );
}

export default Detail;
