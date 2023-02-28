import axios from 'axios'
import React from 'react'
import styled from 'styled-components'

const CommentContainer = styled.div`
  margin-top:10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: small;
  display: flex;
  justify-content: space-between;
  p{
    display: block;
    margin-bottom: 10px;
  }
  span{
    display: inline-block;
    height: 1.5em;
    background-color: var(--blue-100);
    border-radius: var(--br-sm);
  }
`
const DeleteBtn = styled.button`
  margin: 0 20px 10px 0;
 
`

function Comment({comments, loginMemberId}) {
  const DeleteCommentHandler = () =>{
    axios.delete(
      `/api/comments/${comments.commentId}`,
      {
        memberId: loginMemberId
      },
      {
        headers: {
          "ngrok-skip-browser-warning": "12",
          Authorization: localStorage.getItem("jwtToken"),
        },
      }
    ).then(() => {
      
    })
    .catch((err) => err);
  }
      return(
        <CommentContainer key={comments.commentId}>
          <p>{comments.content} - <span>{comments.ownerName}</span> ({new Date(comments.createdAt).toDateString()})</p>
          <DeleteBtn onClick={DeleteCommentHandler}>X</DeleteBtn>
        </CommentContainer>
      )
}

export default Comment