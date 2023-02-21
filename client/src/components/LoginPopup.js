import React from 'react'
import {useNavigate} from 'react-router-dom'
import styled from "styled-components";

const LoginPopupBackdrop = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.371);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9000;
`
const LoginPopupView = styled.div`
    position: relative;
    width: 420px;
    height: 250px;
    border-radius: 2%;
    background-color: white;
    padding: 30px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`
const LoginPopupTitle = styled.h1`
    font-size: 26px;
    font-weight: 600;
`
const LoginPopupCloseBtn = styled.button`
    position: absolute;
    width: 40px;
    height: 40px;
    top: 5px;
    right: 5px;
`
const LoginPopupText = styled.div`
    font-size: 14px;
`
const LoginPopupMove = styled.div`
    text-align: center;
    font-size: 14px;
`
const LoginPopupMoveBtn = styled.button`
    color: var(--blue);
    :hover{
        text-decoration: underline;
    }
`

function LoginPopup({openLoginPopupHandler}) {
    const navigate = useNavigate()
  return (
    <LoginPopupBackdrop onClick={openLoginPopupHandler}>
        <LoginPopupView onClick={(event)=> event.stopPropagation()}>
            <LoginPopupCloseBtn onClick={openLoginPopupHandler}>x</LoginPopupCloseBtn>
            <LoginPopupTitle>Join the Stack Overflow community</LoginPopupTitle>
            <LoginPopupText>Join Stack Overflow to start earning reputation and unlocking new privileges like voting and commenting.</LoginPopupText>
            <LoginPopupMove>Already have an account? <LoginPopupMoveBtn onClick={()=>{navigate('/login')}}> Log in </LoginPopupMoveBtn></LoginPopupMove>
        </LoginPopupView>
    </LoginPopupBackdrop>
  )
}

export default LoginPopup