import React from 'react'
import styled from 'styled-components'

const CommentContainer = styled.div`
  margin-top:10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: small;
  p{
    margin-bottom: 10px;
  }
  span{
    display: inline-block;
    height: 1.5em;
    background-color: var(--blue-100);
    border-radius: var(--br-sm);
  }
`

function Comment({comments}) {
      return(
        <CommentContainer key={comments.commentId}>
          <p>{comments.content} - <span>{comments.member}</span> {new Date(comments.createAt).toDateString()}</p>
        </CommentContainer>
      )
}

export default Comment