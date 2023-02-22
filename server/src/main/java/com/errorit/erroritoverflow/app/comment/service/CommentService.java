package com.errorit.erroritoverflow.app.comment.service;

import com.errorit.erroritoverflow.app.comment.entity.Comment;
import com.errorit.erroritoverflow.app.comment.repository.CommentRepository;
import com.errorit.erroritoverflow.app.exception.BusinessLogicException;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    //생성
    public Comment createComment(Comment comment){
        return commentRepository.save(comment);
    }

    //수정
    public Comment updateComment(Comment comment){
        Comment updateComment = findComment(comment.getCommentId());
        return commentRepository.save(comment);
    }

    //답글 찾기(본인이 작성한 답글)
    public Comment findComment(long commentId){
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    public void deleteComment(long commentId){
        Comment comment = findComment(commentId);
        commentRepository.delete(comment);
    }

}
