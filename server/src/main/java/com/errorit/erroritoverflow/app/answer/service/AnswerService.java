package com.errorit.erroritoverflow.app.answer.service;

import com.errorit.erroritoverflow.app.answer.dto.AnswerDto;
import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.answer.repository.AnswerRepository;
import com.errorit.erroritoverflow.app.exception.BusinessLogicException;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.member.repository.MemberRepository;
import com.errorit.erroritoverflow.app.member.service.MemberService;
import com.errorit.erroritoverflow.app.question.entity.Question;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final MemberService memberService;
    private MemberRepository memberRepository;

    private Answer saveAnswer(Answer answer) {
        Member member = memberRepository.findById(answer.getMember().getId())
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        answer.setMember(member);

        return answerRepository.save(answer);
    }

    //생성
    public Answer createAnswer(Answer answer) {
        verifyAnswer(answer);
        Answer savedAnswer = saveAnswer(answer);
        return savedAnswer;
    }

    //수정
    public Answer updateAnswer(long answerId, AnswerDto.Patch patch) {
        Answer updateAnswer = find(answerId);

        //수정사항 반영
        updateAnswer.setTitle(patch.getTitle());
        updateAnswer.setContent(patch.getContent());
        updateAnswer.setModifiedAt(LocalDateTime.now());

        return saveAnswer(updateAnswer);
    }

    //답변 찾기
    public Answer findAnswer(long answerId){
        return answerRepository.findById(answerId).get();
    }

    public void deleteAnswer(long answerId, long memberId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);

        optionalAnswer.ifPresentOrElse(answer -> {
            if (!Objects.equals(answer.getMember().getId(), memberId)) {
                throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
            }
            answerRepository.delete(answer);
        }, () -> {
            return;
        });
    }

    public Answer find(long answerId) {
        Optional<Answer> findAnswer = this.answerRepository.findById(answerId);
        if (findAnswer.isPresent()) {
            return findAnswer.get();
        } else {
            throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND);
        }
    }

    public Page<Answer> findAnswers(int page, int size){
        return answerRepository.findAll(PageRequest.of(page, size,
                Sort.by("answerId").descending()));
    }

    private void verifyAnswer(Answer answer) {
        // 회원이 존재하는지 확인함
        memberService.findById(answer.getMember().getId());
    }

}