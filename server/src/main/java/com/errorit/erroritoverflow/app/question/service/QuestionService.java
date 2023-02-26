package com.errorit.erroritoverflow.app.question.service;

import com.errorit.erroritoverflow.app.exception.BusinessLogicException;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.member.repository.MemberRepository;
import com.errorit.erroritoverflow.app.member.service.MemberService;
import com.errorit.erroritoverflow.app.question.dto.QuestionDto;
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

import java.time.LocalDateTime;
import java.util.List;
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
        //서비스를 이용하도록 수정
        Member member = memberService.findById(memberId);
        //member부분을 넣어줌
        question.setMember(member);
        return questionRepository.save(question);
    }

    //질문 수정
    public Question updateQuestion(long memberId,
                                   long questionId,
                                   Question question) {
        Question updateQuestion = find(questionId);
        verifyMember(updateQuestion, memberId);

        //수정사항 반영
        updateQuestion.setTitle(question.getTitle());
        updateQuestion.setContent(question.getContent());
        updateQuestion.setModifiedAt(LocalDateTime.now());

        return questionRepository.save(updateQuestion);
    }

    //질문 삭제
    public void deleteQuestion(Long questionId, Long memberId) {
        //삭제할 질문 있는지 확인
        Question deletedQuestion = find(questionId);
        // 삭제를 요청한 맴버가 작성자인지 확인
        verifyMember(deletedQuestion, memberId);
        questionRepository.delete(deletedQuestion);
    }

    //질문 찾기
    public Question find(long questionId) {
        Optional<Question> findQuestion = this.questionRepository.findById(questionId);
        if (findQuestion.isPresent()) {
            return findQuestion.get();
        } else {
            throw new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND);
        }
    }

    //회원이 작성한 질문 목록 조회
    //페이지네이션
    public Page<Question> getQuestionsByMember(Long memberId, int pageNum, String orderBy) {
        Member member = memberService.findById(memberId);

        //페이지네이션 : 최신순으로 정렬
        if (orderBy.equals("최신순")) {
            Pageable pageable = PageRequest.of(pageNum, PAGE_ELEMENT_SIZE, Sort.by("createdAt").descending());
            return questionRepository.findAllByMemberOrderByCreatedAtDesc(memberId, pageable);
        } else {
            throw new BusinessLogicException(ExceptionCode.BAD_REQUEST);
        }
    }


    //질문 작성자가 맞는지 확인함
    private void verifyMember(Question question, long memberId) {
        // 회원이 존재하는지 확인함
        Member findMember = memberService.findById(memberId);
        if (findMember == null) {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }

        // 작성자와 요청자가 동일한지 확인함
        if (!Objects.equals(question.getMember().getMemberId(), findMember.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }
    }

    //질문 페이지네이션
    public Page<Question> questionPageByQuestionId(int pageNum, String orderBy){
        //질문 페이지네이션 : 최신순
        if (orderBy.equals("최신순")){
            Pageable pageable = PageRequest.of(pageNum - 1, PAGE_ELEMENT_SIZE, Sort.by("createdAt").descending());
            return questionRepository.findAll(pageable);
        }
        //질문 페이지네이션 : 조회수순
        else if(orderBy.equals("조회수순")){
            Pageable pageable = PageRequest.of(pageNum - 1, PAGE_ELEMENT_SIZE, Sort.by("viewCount").descending());
            return questionRepository.findAll(pageable);
        }
        else {
            throw new BusinessLogicException(ExceptionCode.BAD_REQUEST);
        }
    }

}
