package com.errorit.erroritoverflow.app.question.service;

import com.errorit.erroritoverflow.app.exception.BusinessLogicException;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import com.errorit.erroritoverflow.app.question.entity.Question;
import com.errorit.erroritoverflow.app.question.repository.QuestionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
@Transactional
@Slf4j
public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    //생성
    public Question createQuestion(Question question) {
        log.info("question = {}", questionRepository.save(question));
        return questionRepository.save(question);
    }


    //수정
    public Question updateQuestion(Question question) {
        Question updateQuestion = question;
        return questionRepository.save(question);
    }

    //질문 찾기
    public Question findQuestion(long questionId) {
        return questionRepository.findById(questionId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }

//    public Page<Question> findQuestions(int page, int size) {
//        //
//        return questionRepository.findAll(PageRequest.of(
//                page, size, Sort.by("questionId")
//                        .descending()));
//    }

    public void deleteQuestion(long questionId) {
        Question question = findQuestion(questionId);
        questionRepository.delete(question);
    }
}
