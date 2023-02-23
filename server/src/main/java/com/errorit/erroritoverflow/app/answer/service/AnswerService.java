package com.errorit.erroritoverflow.app.answer.service;

import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.answer.repository.AnswerRepository;
import com.errorit.erroritoverflow.app.exception.BusinessLogicException;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import com.errorit.erroritoverflow.app.member.service.MemberService;
import com.errorit.erroritoverflow.app.question.mapper.QuestionMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class AnswerService {

    private final MemberService memberService;
    private final QuestionMapper questionMapper;
    private final AnswerRepository answerRepository;

    //생성
    public Answer createAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    //수정
    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = findAnswer(answer.getAnswerId());
        // answer는 content만 고칠 수 있다.
        Optional.ofNullable(answer.getContent())
                .ifPresent(findAnswer::setContent);

        findAnswer.setUpdatedAt(LocalDateTime.now());
        return answerRepository.save(answer);
    }

    //답변 찾기
    public Answer findAnswer(long answerId){
        return find(answerId);
    }

    public Answer find(long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        return optionalAnswer.orElseThrow(
                ()-> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
    }

    public Page<Answer> findAnswers(int page, int size){
        return answerRepository.findAll(PageRequest.of(page, size,
                Sort.by("answerId").descending()));
    }


    public void deleteAnswer(long answerId) {
        Answer answer = findAnswer(answerId);
        answerRepository.delete(answer);
    }
}