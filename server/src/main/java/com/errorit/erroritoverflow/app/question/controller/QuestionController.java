package com.errorit.erroritoverflow.app.question.controller;

import com.errorit.erroritoverflow.app.answer.dto.AnswerDto;
import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.comment.dto.CommentDto;
import com.errorit.erroritoverflow.app.common.response.MultiResponseDto;
import com.errorit.erroritoverflow.app.member.dto.MemberDto;
import com.errorit.erroritoverflow.app.member.service.MemberService;
import com.errorit.erroritoverflow.app.question.dto.QuestionDto;
import com.errorit.erroritoverflow.app.question.entity.Question;
import com.errorit.erroritoverflow.app.question.mapper.QuestionMapper;
import com.errorit.erroritoverflow.app.question.service.QuestionService;
import com.errorit.erroritoverflow.app.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper mapper;
    //private final String QUESTION_BASIC_URI = "/questions";

    //질문 등록
    @PostMapping("questions")
    public ResponseEntity postQuestion(@PathVariable("member-id") @Positive long memberId,
                                       @RequestBody QuestionDto.Post requestDto) {

        Question question = mapper.questionPostDtoToEntity(requestDto);
        Question savedQuestion = questionService.createQuestion(question,memberId);
        QuestionDto.QuestionDetailResponse questionResponse = mapper.questionToResponseDto(savedQuestion);

//        URI location = UriCreator.createUri(QUESTION_BASIC_URI, savedQuestion.getQuestionId());
//        return ResponseEntity.created(location).build();

        return new ResponseEntity<>(questionResponse, HttpStatus.CREATED);
    }

    //질문 수정
    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("member-id") @Positive long memberId
            ,@PathVariable("question-id") @Positive long questionId,
                                        @RequestBody QuestionDto.Patch requestDto){
        Question question = mapper.questionPatchDtoToEntity(requestDto);
        requestDto.setQuestionId(questionId);
        Question updatedQuestion =
                questionService.updateQuestion(memberId,questionId,question);

        return ResponseEntity.ok().body(updatedQuestion);
    }

    //질문 삭제
    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive long questionId,
                                         @PathVariable("member-id") @Positive long memberId){
        questionService.deleteQuestion(questionId,memberId);

        return ResponseEntity.noContent().build();
    }

    // 질문 목록 : 회원이 작성한 질문
    @GetMapping("/members/{member-id}/questions ")
    public ResponseEntity getQuestionListByMemberId(@PathVariable("member-id") Long memberId,
                                                     @RequestParam("sort") String orderBy,
                                                     @RequestParam("page") int page) {
        Page<Question> questionListPage = questionService.getQuestionsByMember(memberId, page, orderBy);
        QuestionDto.MemberQuestionListResponse response = mapper.pageListToMemberQuestionListResponse(questionListPage);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //질문

//    // 질문 상세 페이지
//    @GetMapping("/{question-id}")
//    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive long questionId){
//
//        Question response = questionService.find(questionId);
//
//        return new ResponseEntity<>(mapper.questionDetailResponseDto(response)
//                , HttpStatus.OK);
//    }
}
