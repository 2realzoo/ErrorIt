package com.errorit.erroritoverflow.app.question.service;

import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.answer.mapper.AnswerMapper;
import com.errorit.erroritoverflow.app.exception.BusinessLogicException;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.member.repository.MemberRepository;
import com.errorit.erroritoverflow.app.member.service.MemberService;
import com.errorit.erroritoverflow.app.question.dto.QuestionDto;
import com.errorit.erroritoverflow.app.question.entity.Question;
import com.errorit.erroritoverflow.app.question.mapper.QuestionMapper;
import com.errorit.erroritoverflow.app.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    private final QuestionMapper questionMapper;
    private final AnswerMapper answerMapper;
    private MemberRepository memberRepository;
    private final QuestionRepository questionRepository;
    private final MemberService memberService;

    private Question saveQuestion(Question question) {
        Member member = memberRepository.findById(question.getMember().getId())
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        question.setMember(member);

        return questionRepository.save(question);
    }

    //생성
    public Question createQuestion(Question question) {
        verifyQuestion(question);
        Question savedQuestion = saveQuestion(question);
        return savedQuestion;
    }

    //수정
    public Question updateQuestion(Long questionId, QuestionDto.Patch patch) {
        Question updateQuestion = find(questionId);

        //수정사항 반영
        updateQuestion.setTitle(patch.getTitle());
        updateQuestion.setContent(patch.getContent());
        //updateQuestion.setModifiedAt(LocalDateTime.now());

        return questionRepository.save(updateQuestion);
    }

    //특정 질문 찾기
    public Question findQuestion(Long questionId) {

        return questionRepository.findById(questionId).get();
    }

    public void deleteQuestion(long questionId, long memberId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);

        optionalQuestion.ifPresentOrElse(question -> {
            if (!Objects.equals(question.getMember().getId(), memberId)) {
                throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
            }
            questionRepository.delete(question);
        }, () -> {
            return;
        });
    }

    //질문 찾기
    public Question find(Long questionId) {
        Optional<Question> findQuestion = this.questionRepository.findById(questionId);
        if (findQuestion.isPresent()) {
            return findQuestion.get();
        } else {
            throw new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND);
        }
    }

    public Page<Question> findQuestions(int page, int size) {
        return questionRepository.findAll(
                PageRequest.of(page, size, Sort.by("questionId").descending()));
    }

    private void verifyQuestion(Question question) {
        // 회원이 존재하는지 확인
        memberService.findById(question.getMember().getId());
    }

}
