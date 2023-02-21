import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoginPopup from "./LoginPopup";

const DetailContainer = styled.div`
  position: relative;

`
const QuestionDetail = styled.div`

`;
const Comment = styled.div`

`;
const SideMenu = styled.div`

`;
const UserBoxContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
`
const UserAddOn = styled.div`
  padding: 10px 0;
  width: 50%;
  color: var(--black-300);
  li{
      display: inline;
      margin-right: 5px;
  }
`
const UserInfoConainer = styled.div`
  padding: 10px 0;
  width: 50%;
`

function Detail({data}) {
  const [isOpenLoginPopup, setisOpenLoginPopup] = useState(false)
  const userAddOnArr = ['Share','Edit','Follow']
  const openLoginPopupHandler = () =>{
    setisOpenLoginPopup(!isOpenLoginPopup)
  }
  return (
  <DetailContainer key={data?.question?.questionId}>
    <SideMenu/>
    <QuestionDetail>{data?.question?.content}</QuestionDetail>
    <UserBoxContainer>
      <UserAddOn>
      <ul>
        {userAddOnArr.map((el)=>{
          return(
            <li onClick={openLoginPopupHandler}>{el}</li>
          )
        })}
      </ul>
      </UserAddOn>
      <UserInfoConainer>

      </UserInfoConainer>
    </UserBoxContainer>
    <Comment />
    {
      isOpenLoginPopup ? <LoginPopup openLoginPopupHandler = {openLoginPopupHandler}></LoginPopup> : null
    }
</DetailContainer>
    
  );
}

export default Detail;
