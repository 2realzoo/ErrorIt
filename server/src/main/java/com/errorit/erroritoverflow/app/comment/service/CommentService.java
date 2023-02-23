package com.errorit.erroritoverflow.app.comment.service;

import com.errorit.erroritoverflow.app.answer.service.AnswerService;
import com.errorit.erroritoverflow.app.comment.entity.Comment;
import com.errorit.erroritoverflow.app.comment.repository.CommentRepository;
import com.errorit.erroritoverflow.app.exception.BusinessLogicException;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import com.errorit.erroritoverflow.app.member.service.MemberService;
import com.errorit.erroritoverflow.app.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final QuestionService questionService;
    private final AnswerService answerService;

    //생성
    public Comment createComment(Comment comment){
        return commentRepository.save(comment);
    }

    //수정
    public Comment updateComment(Comment comment){
        Comment updateComment = findComment(comment.getCommentId());

        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> updateComment.setContent(content));

        updateComment.setUpdatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    //댓글 찾기
    public Comment findComment(long commentId){
        return findVerifiedComment(commentId);
    }

    //삭제
    public void deleteComment(long commentId){
        Comment comment = findComment(commentId);
        commentRepository.delete(comment);
    }

    //오류남
    public Page<Comment> findComments(int page, int size){
        return commentRepository.findAll(
                PageRequest.of(page, size, Sort.by("").descending()));
    }

    private void verifyComment(Comment comment) {
        //질문한 회원이 존재하는지 확인
        memberService.findById(comment.getMember().getId());
    }

    public Comment findVerifiedComment(long commentId){
        Optional<Comment> optionalComment =
                commentRepository.findById(commentId);
        Comment findComment =
                optionalComment.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }

}
