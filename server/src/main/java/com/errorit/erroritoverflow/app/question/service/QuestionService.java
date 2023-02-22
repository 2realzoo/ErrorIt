package com.errorit.erroritoverflow.app.question.service;

import com.errorit.erroritoverflow.app.answer.mapper.AnswerMapper;
import com.errorit.erroritoverflow.app.exception.BusinessLogicException;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.member.repository.MemberRepository;
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

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class QuestionService {
    @Autowired
    private final QuestionRepository questionRepository;
    private final MemberService memberService;
    private final QuestionMapper questionMapper;
    private final AnswerMapper answerMapper;
    private MemberRepository memberRepository;

    //질문 저장
    public Question saveQuestion(Question question, Long memberId) {
        //질문을 작성한 회원 찾기
        Member findMember = memberService.findById(memberId);
        //질문 만들기
        Question madeQuestion = createQuestion(question,findMember);
        //저장
        return questionRepository.save(madeQuestion);
    }

    //생성
    public Question createQuestion(Question question, Member member) {
        question.setMember(member);
        member.getQuestions().add(question);

        return question;
    }

    //이미 글이 존재하면 에러
    public Question findVerifiedQuestion(Long questionId) {
        return questionRepository.findById(questionId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }


    //수정
    public Question updateQuestion(Question updateQuestion) {
        //회원인지 확인
        //Question question = findQuestionWriter(updateQuestion,memberId);
        //수정사항 반영
        updateQuestion.setTitle(updateQuestion.getTitle());
        updateQuestion.setContent(updateQuestion.getContent());

        return questionRepository.save(updateQuestion);
    }

    //질문 찾기
    public Question findQuestion(Long questionId) {
        Question findQuestion = findVerifiedQuestion(questionId);
        //findQuestion.setView(findQuestion.getView()+1);
        questionRepository.save(findQuestion);
        return findQuestion;
    }


    //질
    public Page<Question> findQuestions(int page, int size) {
        return questionRepository.findAll(
                PageRequest.of(page, size, Sort.by("questionId").descending()));
    }

    // 질문 작성자만 질문을 수정, 삭제할 수 있도록 질문의 작성자를 찾는 메서드
//    public Question findQuestionWriter(long questionId,long memberId) {
//
//        //맴버 ID 어떻게 가져올까...?
//        Member findMemberId = memberRepository.findByMemberId(findMemberId);
//        Question question = findVerifiedQuestion(questionId);
//        if(question.getMember().getId() != findMemberId) {
//            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
//        }
//        return question;
//    }


    public void deleteQuestion(long questionId) {
        //회원이 작성한 질문이 맞는지 확인
        //Question question = findQuestionWriter(questionId,memberId);
        
        //회원 질문 갯수 감소 시키기(필요할 경우)
//        Member member = question.getMember();
//        member.setCount(member.getCount() - 1);
//        memberRepository.save(member);

        Question question = findQuestion(questionId);
        questionRepository.delete(question);
    }

    private Member getMember(long memberId) {
        return memberRepository.findById(memberId).get();
    }

}
