package com.errorit.erroritoverflow.app.answer.service;

import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.answer.repository.AnswerRepository;
import com.errorit.erroritoverflow.app.exception.BusinessLogicException;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import com.errorit.erroritoverflow.app.member.entity.Member;
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

import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class AnswerService {

    private final int PAGE_ELEMENT_SIZE = 10;
    private final AnswerRepository answerRepository;
    private final QuestionService questionService;
    private final MemberService memberService;

    // 답글 추가
    public Answer createAnswerByQuestionId(Answer answer, Long memberId, Long questionId) {
        Member findedMember = memberService.findById(memberId);
        Question findedQuestion = questionService.find(questionId);
        answer.setMember(findedMember);
        answer.setQuestion(findedQuestion);
        return answerRepository.save(answer);
    }

    // 답글 수정
    public Answer update(Answer updateAnswer, Long memberId) {
        Answer originalAnswer = findVerifyAnswerById(updateAnswer.getAnswerId());
        checkOwner(originalAnswer, memberId);
        originalAnswer.setContent(updateAnswer.getContent());
        return answerRepository.save(originalAnswer);
    }

    // 답글 삭제
    public Long delete(Long answerId, Long memberId) {
        Answer findedAnswer = findVerifyAnswerById(answerId);
        checkOwner(findedAnswer, memberId);
        answerRepository.deleteById(answerId);
        return answerId;
    }

    // 답글 목록 : 질문
    public Page<Answer> findAnswerListByQuestionId(Long questionId, int page, String orderBy) {
        if (orderBy.equals("최신순")) {
            return answerRepository.findAllByQuestion_QuestionIdOrderByCreatedAt(
                    questionId,
                    PageRequest.of(page, PAGE_ELEMENT_SIZE, Sort.by("createdAt").descending())
            );
        } else {
            throw new BusinessLogicException(ExceptionCode.BAD_REQUEST);
        }
    }

    // 답글 목록 : 회원
    public Page<Answer> findAnswerListByMemberId(Long memberId, int page, String orderBy) {
        if (orderBy.equals("최신순")) {
            return answerRepository.findAllByMember_MemberIdOrderByCreatedAt(
                    memberId,
                    PageRequest.of(page, PAGE_ELEMENT_SIZE, Sort.by("createdAt").descending())
            );
        } else {
            throw new BusinessLogicException(ExceptionCode.BAD_REQUEST);
        }
    }

    // 회원 조회
    public Answer findById(Long answerId) {
        return findVerifyAnswerById(answerId);
    }

    // 작성자가 맞는지 확인
    private void checkOwner(Answer answer, Long memberId) {
        Member findedMember = memberService.findById(memberId);
        if (!Objects.equals(answer.getMember().getId(), findedMember.getId())) {
            throw new BusinessLogicException(ExceptionCode.AUTHORIZED_FAIL);
        }
    }

    // 존재하는 답글인지 확인
    private Answer findVerifyAnswerById(Long answerId) {
        Optional<Answer> answerOptional = answerRepository.findById(answerId);
        if (answerOptional.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND);
        }
        return answerOptional.get();
    }
}