package com.errorit.erroritoverflow.app.answer.controller;

import com.errorit.erroritoverflow.app.answer.dto.AnswerDto;
import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.answer.mapper.AnswerMapper;
import com.errorit.erroritoverflow.app.answer.service.AnswerService;
import com.errorit.erroritoverflow.app.common.response.MultiResponseDto;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.question.dto.QuestionDto;
import com.errorit.erroritoverflow.app.question.entity.Question;
import com.errorit.erroritoverflow.app.question.mapper.QuestionMapper;
import com.errorit.erroritoverflow.app.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@Slf4j
@RestController
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper mapper;

    // 답변 추가
    @PostMapping("/questions/{question-id}/answers")
    public ResponseEntity<AnswerDto.AnswerResponse> createAnswer(@PathVariable("question-id") Long questionId,
                                          @RequestBody AnswerDto.Post answerDto) {

        Answer answer = mapper.answerPostDtoToAnswer(answerDto);
        Answer savedAnswer = answerService.createAnswerByQuestionId(answer, answerDto.getMemberId(), questionId);
        AnswerDto.AnswerResponse response = mapper.answerToResponseDto(savedAnswer);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 답변 수정
    @PatchMapping("/answers/{answer-id}")
    public ResponseEntity<AnswerDto.AnswerResponse> updateAnswer(@PathVariable("answer-id") Long answerId,
                                          @RequestBody AnswerDto.Patch answerDto) {

        Answer answer = mapper.answerPatchDtoToAnswer(answerDto);
        answer.setAnswerId(answerId);
        Answer updatedAnswer = answerService.update(answer, answerDto.getMemberId());
        AnswerDto.AnswerResponse response = mapper.answerToResponseDto(updatedAnswer);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 답변 삭제
    @DeleteMapping("/answers/{answer-id}")
    public ResponseEntity<Map<String, Long>> deleteAnswer(@PathVariable("answer-id") Long answerId,
                                          @RequestBody AnswerDto.Delete answerDto) {
        Long deletedAnswerId = answerService.delete(answerId, answerDto.getMemberId());
        Map<String, Long> response = new HashMap<>();
        response.put("deletedAnswerId" , deletedAnswerId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 답변 목록 : 질문 상세 페이지
    @GetMapping("/questions/{question-id}/answers")
    public ResponseEntity<?> getAnswerListByQuestionId(@PathVariable("question-id") Long questionId,
                                                       @RequestParam("sort") String orderBy) {
        List<Answer> answerList = answerService.findAnswerListByQuestionId(questionId, orderBy);
        List<AnswerDto.AnswerResponse> response = mapper.answerListToResponseDtoList(answerList);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 답변 목록 : 회원이 작성한 답변 페이지
    @GetMapping("/members/{member-id}/answers")
    public ResponseEntity<?> getAnswerListByMemberId(@PathVariable("member-id") Long memberId,
                                                       @RequestParam("sort") String orderBy,
                                                       @RequestParam("page") int page) {
        Page<Answer> answerListPage = answerService.findAnswerListByMemberId(memberId, page, orderBy);
        AnswerDto.MemberAnswerListResponse response = mapper.pageListToMemberAnswerListResponse(answerListPage);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
