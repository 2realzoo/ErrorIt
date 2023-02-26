package com.errorit.erroritoverflow.app.question.service;

import com.errorit.erroritoverflow.app.exception.BusinessLogicException;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.member.service.MemberService;
import com.errorit.erroritoverflow.app.question.entity.Question;
import com.errorit.erroritoverflow.app.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final MemberService memberService;
    private final int PAGE_ELEMENT_SIZE = 10;

    //질문 생성
    public Question createQuestion(Question question, Long memberId) {
        Member member = memberService.findById(memberId);
        question.setMember(member);
        return questionRepository.save(question);
    }

    // 질문 조회
    public Question findById(Long questionId) {
        return findVerifyQuestion(questionId);
    }

    //질문 수정
    public Question updateQuestion(Question question, Long memberId) {
        Question originalQuestion = findVerifyQuestion(question.getQuestionId());
        checkOwner(originalQuestion, memberId);

        // 수정사항 반영
        Optional.ofNullable(question.getTitle()).ifPresent(originalQuestion::setTitle);
        Optional.ofNullable(question.getContent()).ifPresent(originalQuestion::setTitle);

        return questionRepository.save(originalQuestion);
    }

    //질문 삭제
    public Long deleteQuestion(Long questionId, Long memberId) {
        //삭제할 질문 있는지 확인
        Question deletedQuestion = findVerifyQuestion(questionId);
        // 삭제를 요청한 맴버가 작성자인지 확인
        checkOwner(deletedQuestion, memberId);
        questionRepository.delete(deletedQuestion);
        return questionId;
    }

    //질문 페이지네이션
    public Page<Question> getQuestions(int pageNum, String orderBy){
        pageNum -= 1;
        //질문 페이지네이션 : 최신순
        if (orderBy.equals("최신순")){
            Pageable pageable = PageRequest.of(pageNum, PAGE_ELEMENT_SIZE, Sort.by("createdAt").descending());
            return questionRepository.findAll(pageable);
        }
        //질문 페이지네이션 : 조회순
        else if(orderBy.equals("조회순")){
            Pageable pageable = PageRequest.of(pageNum, PAGE_ELEMENT_SIZE, Sort.by("viewCount").descending());
            return questionRepository.findAll(pageable);
        }
        else {
            throw new BusinessLogicException(ExceptionCode.BAD_REQUEST);
        }
    }

    // 회원이 작성한 질문 목록 조회
    public Page<Question> getQuestionsByMember(int pageNum, String orderBy, Long memberId) {

        Member member = memberService.findById(memberId);
        pageNum -= 1;

        //페이지네이션 : 최신순으로 정렬
        if (orderBy.equals("최신순")) {
            Pageable pageable = PageRequest.of(pageNum, PAGE_ELEMENT_SIZE, Sort.by("createdAt").descending());
            return questionRepository.findAllByMember_MemberIdOrderByCreatedAtDesc(memberId, pageable);
        //페이지네이션 : 조회순으로 정렬
        } else if (orderBy.equals("조회순")) {
            Pageable pageable = PageRequest.of(pageNum, PAGE_ELEMENT_SIZE, Sort.by("viewCount").descending());
            return questionRepository.findAllByMember_MemberIdOrderByViewCountDesc(memberId, pageable);
        } else {
            throw new BusinessLogicException(ExceptionCode.BAD_REQUEST);
        }
    }

    // 유효한 질문인지 조회
    private Question findVerifyQuestion(long questionId) {
        Optional<Question> findQuestion = questionRepository.findById(questionId);
        if (findQuestion.isPresent()) {
            return findQuestion.get();
        } else {
            throw new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND);
        }
    }

    // 질문 작성자가 맞는지 확인함
    private void checkOwner(Question question, long memberId) {
        // 회원이 존재하는지 확인함
        Member findMember = memberService.findById(memberId);

        // 작성자와 요청자가 동일한지 확인함
        if (!Objects.equals(question.getMember().getMemberId(), findMember.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.AUTHORIZED_FAIL);
        }
    }



}
