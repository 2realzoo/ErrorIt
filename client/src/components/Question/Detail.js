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
} from "react-icons/bs";

const DetailContainer = styled.div`
  padding-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
`;
const QuestionDetail = styled.div`
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
const EditContentContainer = styled.textarea`
  width: 100%;
`

function Detail({ QorA, data, idValue, loginMemberId,setData }) {
  const [isOpenLoginPopup, setisOpenLoginPopup] = useState(false);
  const [isOpenCommentForm, setIsOpenCommentForm] = useState(false);
  const [isOpenEditContent, setIsOpenEditContent] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [questionContentValue, setQuestionContentValue] = useState(data.content)
  const openLoginPopupHandler = () => {
    if(loginMemberId){

    }else{
      setisOpenLoginPopup(!isOpenLoginPopup);
    }
  };
  const openCommentHandler = () => {
    if(loginMemberId){
      setIsOpenCommentForm(true);
    }else{
    }
  };
  
  const commentValueHandler = (e) => {
    setCommentValue(e.target.value);
  };

  const commentSubmitHandler = () => {
    if(commentValue.length <= 0){
      alert('길이좀')
    }else{
      axios
      .post(
        `/api/questions/${idValue}/comments`,
        {
          memberId: loginMemberId,
          content: commentValue,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "12",
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((res) => {
        const obj = Object.assign({},data)
        obj.comments.push(res.data)
        console.log(obj)
        setData(obj)
        setCommentValue("")
        setIsOpenCommentForm(false);
      })
      .catch((err) => err);
    }
  };

  const editContentHandler = () =>{
    return loginMemberId ? setIsOpenEditContent(true) : setisOpenLoginPopup(true)
  }

  const contentValueHandler = (e) => {
    console.log(questionContentValue)
    console.log(e.target.scrollHeight)
    console.log(e.target.style.height)
    e.target.style.height = e.target.scrollHeight+'px'
    setQuestionContentValue(e.target.value)
  }

  return (
    <DetailContainer key={data.QorA}>
      <SideMenu>
        <RecoContianer>
          <BsFillCaretUpFill />
          <b>0</b>
          <BsFillCaretDownFill />
        </RecoContianer>
        <BsBookmarkCheck />
        <BsArrowCounterclockwise />
      </SideMenu>
      <MainMenu>
        <QuestionDetail>{isOpenEditContent ?
          <EditContentContainer value={questionContentValue} onChange={(e)=>{contentValueHandler(e)}}>

          </EditContentContainer>
        :data.content}</QuestionDetail>
        <UserBoxContainer>
          <UserAddOn>
            <ul>
              <li onClick={openLoginPopupHandler}>Share</li>
              <li onClick={editContentHandler}>Edit</li>
              <li onClick={openLoginPopupHandler}>Follow</li>
            </ul>
          </UserAddOn>
          <UserInfoConainer>
            <UserInfo>
              <CreatedAt>
                asked {new Date(data.createdAt).toDateString()}
              </CreatedAt>
              <UserName>{data.member}</UserName>
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
              }}
            >
              Submit
            </SubmitCommentBtn>
          </AddCommentContainer>
        ) : (
          <CommentAddBtn onClick={()=>{openCommentHandler(); openLoginPopupHandler();}}>
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
