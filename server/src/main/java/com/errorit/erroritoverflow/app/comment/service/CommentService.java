package com.errorit.erroritoverflow.app.comment.service;

import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.answer.service.AnswerService;
import com.errorit.erroritoverflow.app.comment.dto.CommentDto;
import com.errorit.erroritoverflow.app.comment.entity.Comment;
import com.errorit.erroritoverflow.app.comment.repository.CommentRepository;
import com.errorit.erroritoverflow.app.exception.BusinessLogicException;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.member.repository.MemberRepository;
import com.errorit.erroritoverflow.app.member.service.MemberService;
import com.errorit.erroritoverflow.app.question.entity.Question;
import com.errorit.erroritoverflow.app.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final QuestionService questionService;
    private final AnswerService answerService;
    private final MemberService memberService;

    // 댓글 생성 : 질문에 추가
    public Comment createByQuestionId(Comment comment, Long memberId, Long questionId) {
        Member findedMember = memberService.findById(memberId);
        Question findedQuestion = questionService.find(questionId);
        comment.setQuestion(findedQuestion);
        comment.setMember(findedMember);
        return commentRepository.save(comment);
    }

    // 댓글 생성 : 답글에 추가
    public Comment createByAnswerId(Comment comment, Long memberId, Long answerId) {
        Member findedMember = memberService.findById(memberId);
        Answer findedAnswer = answerService.find(answerId);
        comment.setAnswer(findedAnswer);
        comment.setMember(findedMember);
        return commentRepository.save(comment);
    }

    // 댓글 수정
    public Comment update(Comment updateComment, Long memberId) {
        Comment originalComment = findVerifyCommentById(updateComment.getCommentId());
        checkOwner(originalComment, memberId);
        originalComment.setContent(updateComment.getContent());
        return commentRepository.save(originalComment);
    }

    // 댓글 삭제
    public Long delete(Long commentId, Long memberId) {
        Comment findedComment = findVerifyCommentById(commentId);
        checkOwner(findedComment, memberId);
        commentRepository.deleteById(findedComment.getCommentId());
        return commentId;
    }

    // 질문조회 상세 : 질문 댓글 목록 : 질문 id 를 통한 댓글 목록 조회
    public List<Comment> findAllByQuestionId(Long questionId) {
        return commentRepository.findByQuestion_QuestionId(questionId);
    }

    // 답글 목록 조회 : 답글 댓글 목록 : 답글 id 를 통한 댓글 목록 조회
    public List<Comment> findAllByAnswerId(Long answerId) {
        return commentRepository.findByAnswer_AnswerId(answerId);
    }

    // 작성자가 맞는지 확인
    private void checkOwner(Comment comment, Long memberId) {
        Member findedMember = memberService.findById(memberId);
        if (!Objects.equals(comment.getMember().getId(), findedMember.getId())) {
            throw new BusinessLogicException(ExceptionCode.AUTHORIZED_FAIL);
        }
    }

    // 존재하는 댓글인지 확인 후 return
    private Comment findVerifyCommentById(Long commentId) {
        Optional<Comment> commentOptional = commentRepository.findById(commentId);
        if (commentOptional.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND);
        }
        return commentOptional.get();
    }
}
