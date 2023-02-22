package com.errorit.erroritoverflow.app.question.service;

import com.errorit.erroritoverflow.app.answer.mapper.AnswerMapper;
import com.errorit.erroritoverflow.app.exception.BusinessLogicException;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.member.service.MemberService;
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
    private final MemberService memberService;


    //생성
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    //이미 글이 존재하면 에러
    private void verifyExistsTitle(String title) {
        Optional<Question> question = questionRepository.findByTitle(title);
        if (question.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.QUESTION_CODE_EXISTS);
        }
    }


    //수정
    public Question updateQuestion(Question question) {
        /**
         * TODO
         * - 검증 규칙 생각해보기
         * - 데이터 조회 및 업데이트 로직 구현
         */
        Question findQuestion = findQuestion(question.getQuestionId());

        return questionRepository.save(question);
    }

    //질문 찾기
    public Question findQuestion(Long questionId) {
        Question findQuestion = findVerifiedQuestion(questionId);
        findQuestion.setView(findQuestion.getView()+1);
        questionRepository.save(findQuestion);
        return findQuestion;
    }


    //질문을 리스트로 뽑아 내기
    public Page<Question> findQuestions(int page, int size) {
        return questionRepository.findAll(
                PageRequest.of(page, size, Sort.by("questionId").descending()));
    }

    // 질문 작성자만 질문을 수정, 삭제할 수 있도록 질문의 작성자를 찾는 메서드
    public Member findQuestionWriter(long questionId) {
        Question findQuestion = findVerifiedQuestion(questionId);
        return findQuestion.getMember();
    }

    public void deleteQuestion(long questionId) {
        Question question = findQuestion(questionId);
        questionRepository.delete(question);
    }

//    public Page<Question> findQuestionSearchByTitleOrContent(String title, String content, int page, int size) {
//        return questionRepository.findAllByTitleContainsOrContentContains(title, content,
//                PageRequest.of(page, size, Sort.by("questionId").descending()));
//    }

}
