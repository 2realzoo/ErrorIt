package com.errorit.erroritoverflow.app.comment.service;

import com.errorit.erroritoverflow.app.comment.dto.CommentDto;
import com.errorit.erroritoverflow.app.comment.entity.Comment;
import com.errorit.erroritoverflow.app.comment.repository.CommentRepository;
import com.errorit.erroritoverflow.app.exception.BusinessLogicException;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.member.repository.MemberRepository;
import com.errorit.erroritoverflow.app.member.service.MemberService;
import com.errorit.erroritoverflow.app.question.entity.Question;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private MemberRepository memberRepository;

    private Comment saveComment(Comment comment) {
        Member member = memberRepository.findById(comment.getMember().getId())
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        comment.setMember(member);

        return commentRepository.save(comment);
    }

    //생성
    public Comment createComment(Comment comment) {
        verifyComment(comment);
        Comment savedComment = saveComment(comment);
        return savedComment;
    }

    //수정
    public Comment updateComment(long questionId, CommentDto.Patch patch){
        Comment updateComment = findComment(questionId);

        //수정사항 반영
        updateComment.setContent(patch.getContent());
        updateComment.setUpdatedAt(LocalDateTime.now());

        return commentRepository.save(updateComment);
    }

    //특정 댓글 찾기
    public Comment findComment(long commentId) {
        return commentRepository.findById(commentId).get();
    }

    //삭제
    public void deleteComment(long commentId, long memberId){
        Optional<Comment> optionalComment = commentRepository.findById(commentId);

        optionalComment.ifPresentOrElse(comment -> {
            if (!Objects.equals(comment.getMember().getId(), memberId)) {
                throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
            }
            commentRepository.delete(comment);
        }, () -> {
            return;
        });
    }

    //질문 찾기
    public Comment find(long commentId) {
        Optional<Comment> findComment = this.commentRepository.findById(commentId);
        if (findComment.isPresent()) {
            return findComment.get();
        } else {
            throw new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND);
        }
    }



    public Page<Comment> findComments(int page, int size){
        return commentRepository.findAll(
                PageRequest.of(page, size, Sort.by("comment-id").descending()));
    }

    private void verifyComment(Comment comment) {
        memberService.findById(comment.getMember().getId());
    }


}
