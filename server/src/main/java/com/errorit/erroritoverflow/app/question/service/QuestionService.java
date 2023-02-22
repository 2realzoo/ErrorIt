package com.errorit.erroritoverflow.app.question.service;

import com.errorit.erroritoverflow.app.answer.mapper.AnswerMapper;
import com.errorit.erroritoverflow.app.exception.BusinessLogicException;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
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

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
//@RequiredArgsConstructor//생성자 주입
public class QuestionService {

    @Autowired
    private final QuestionRepository questionRepository;
//    private final MemberService memberService;
//    private final QuestionMapper mapper;
//    private final AnswerMapper answerMapper;

    //생성
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }


    //수정
    public Question updateQuestion(Question question) {
        Question findQuestion = findQuestion(question.getQuestionId());

        return questionRepository.save(question);
    }

    //질문 찾기
    public Question findQuestion(Long questionId) {
        Optional<Question> findQuestion = questionRepository.findById(questionId);
        return findQuestion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }
    
    //질문을 리스트로 뽑아 내기
    public Page<Question> findQuestions(int page, int size) {
        return questionRepository.findAll(
                PageRequest.of(page, size, Sort.by("questionId").descending()));
    }
    
    //질문 조회수
//    public void addViewCount(Question question) {
//        question.setQuestionViewCount(question.getQuestionViewCount() + 1);
//    }

    public void deleteQuestion(long questionId) {
        Question question = findQuestion(questionId);
        questionRepository.delete(question);
    }

//    public Page<Question> findQuestionSearchByTitleOrContent(String title, String content, int page, int size) {
//        return questionRepository.findAllByTitleContainsOrContentContains(title, content,
//                PageRequest.of(page, size, Sort.by("questionId").descending()));
//    }
}
