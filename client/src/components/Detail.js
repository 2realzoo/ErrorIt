import axios from "axios";
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
`
const UserInfoConainer = styled.div`
  padding: 10px 0;
  width: 50%;
`

function Detail() {
  const [isOpenLoginPopup, setisOpenLoginPopup] = useState(false)
  const openLoginPopupHandler = () =>{
    setisOpenLoginPopup(!isOpenLoginPopup)
  }
  return (
  <DetailContainer>
    <SideMenu/>
    <QuestionDetail>
    I'm trying to identify outliers in each housing type category, but
    encountering an issue. Whenever I run the code, I receive the
    following error: "IndexingError: Unalignable boolean Series provided
    as indexer (index of the boolean Series and of the indexed object do
    not match).
    </QuestionDetail>
    <UserBoxContainer>
      <UserAddOn>
        <button onClick={openLoginPopupHandler}>Share</button> 
        Edit
        Follow
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
