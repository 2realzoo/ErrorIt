import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import axiosCall from "../util/axiosCall";
import Refresh from "../util/Refresh";

const CommentContainer = styled.div`
  margin-top: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: small;
  display: flex;
  justify-content: space-between;
  p {
    display: block;
    /* width: 85%; */
    margin-bottom: 10px;
    word-break: break-all;
  }
  span {
    display: inline-block;
    height: 1.5em;
    background-color: var(--blue-100);
    border-radius: var(--br-sm);
  }
`;

const CommentEditBtnContianer = styled.div`
  display: flex;
  align-items: center;
`

const EditCommentContianer = styled.textarea`
  width: 85%;
`;

const CommentEditBtn = styled.button`
  margin: 0 20px 10px 0;
  border-radius: var(--br-sm);
  border: 1px solid var(--blue-300);
  padding: 3px;
  height: 30px;
`;


function Comment({ comments, loginMemberId, data, setData }) {
  const [isOpenEditComment, setIsOpenEditComment] = useState(false);
  const [commentsValue, setCommentsValue] = useState(comments)
  const [commentContent, setCommentContent] = useState(commentsValue.content)
  const DeleteCommentHandler = async () => {
    if (isOpenEditComment) {
      setIsOpenEditComment(false)
    } else {
      // eslint-disable-next-line no-restricted-globals
      const askDelete = confirm("정말로 삭제 하시겠습니까?");
      if (!askDelete) {
      } else {
        let result = await axiosCall(
          `/api/comments/${commentsValue.commentId}`,
          "DELETE"
        );
        while (result.response && result.response.data.status === 401) {
          await Refresh();
          result = await axiosCall(
            `/api/comments/${commentsValue.commentId}`,
            "DELETE"
          );
        }
        if (result.status === 200) {
          const obj = Object.assign({}, data);
          const arr = [...data.comments].filter(
            (e) => result.data.deletedCommentId !== e.commentId
          );
          obj.comments = arr;
          setData(obj);
          return;
        }
        return result;
      }
    }
  };
  const EditCommentHandler = async () => {
    if(isOpenEditComment){
      let result = await axiosCall(
        `/api/comments/${commentsValue.commentId}`,
        "PATCH",
        {
          memberId: loginMemberId,
          content:commentContent
        }
      );
      while (result.response && result.response.data.status === 401) {
        await Refresh();
        result = await axiosCall(
          `/api/comments/${commentsValue.commentId}`,
          "PATCH",
          {
            memberId: loginMemberId,
            content:commentContent
          }
        );
      }
      if (result.status === 200) {
        console.log(result.data)
        setCommentsValue(result.data)
        setIsOpenEditComment(false)
      }
      return result;
    }else{
      setIsOpenEditComment(true);
    }
  }

  return (
    <CommentContainer key={commentsValue.commentId}>
      {isOpenEditComment ? (
        <EditCommentContianer
          value={commentContent}
          onChange={(e)=>{setCommentContent(e.target.value)}}
        ></EditCommentContianer>
      ) : (
        <p>
          {commentsValue.content} - <span>{commentsValue.ownerName}</span> (
          {new Date(commentsValue.createdAt).toDateString()})
        </p>
      )}
      {commentsValue.ownerId === +loginMemberId ? (
        <CommentEditBtnContianer>
          <CommentEditBtn
            onClick={EditCommentHandler}
          >
            EDIT
          </CommentEditBtn>
          <CommentEditBtn onClick={DeleteCommentHandler}>
            {isOpenEditComment ? "CANCEL" : "DELETE"}
          </CommentEditBtn>
        </CommentEditBtnContianer>
      ) : null}
    </CommentContainer>
  );
}

export default Comment;
