package com.errorit.erroritoverflow.app.answer.service;

import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.answer.mapper.AnswerMapper;
import com.errorit.erroritoverflow.app.answer.repository.AnswerRepository;
import com.errorit.erroritoverflow.app.exception.BusinessLogicException;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import com.errorit.erroritoverflow.app.question.mapper.QuestionMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Slf4j
public class AnswerService {

    @Autowired
    private final AnswerRepository answerRepository;

    //private final MemberService memberService;
    private final QuestionMapper questionMapper;

    public AnswerService(AnswerRepository answerRepository,
                         QuestionMapper questionMapper) {
        this.answerRepository = answerRepository;
        this.questionMapper = questionMapper;
    }

    //생성
    public Answer createAnswer(Answer answer) {
        log.info("answer = {}", answer);
        Answer saveAnswer = saveAnswer(answer);
        log.info("saveAnswer = {}", saveAnswer);
        return saveAnswer;
    }

    //수정
    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = findAnswer(answer.getAnswerId());

        return answerRepository.save(answer);
    }

    //질문 찾기
    public Answer findAnswer(long answerId) {
        return answerRepository.findById(answerId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
    }

//    public Page<Question> findQuestions(int page, int size) {
//        //
//        return questionRepository.findAll(PageRequest.of(
//                page, size, Sort.by("questionId")
//                        .descending()));
//    }

    public void deleteAnswer(long answerId) {
        Answer answer = findAnswer(answerId);
        answerRepository.delete(answer);
    }

    private Answer saveAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

}