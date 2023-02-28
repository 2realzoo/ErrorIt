package com.errorit.erroritoverflow.app.question.controller;

import com.errorit.erroritoverflow.app.question.dto.QuestionDto;
import com.errorit.erroritoverflow.app.question.entity.Question;
import com.errorit.erroritoverflow.app.question.mapper.QuestionMapper;
import com.errorit.erroritoverflow.app.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@Slf4j
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper mapper;
    private final String QUESTION_BASIC_URI = "/questions";

    // 질문 등록
    @PostMapping("/questions")
    public ResponseEntity<Map<String, Long>> postQuestion(@RequestBody QuestionDto.Post requestDto) {

        Question question = mapper.questionPostDtoToEntity(requestDto);
        Question savedQuestion = questionService.createQuestion(question,requestDto.getMemberId());

        Map<String, Long> response = new HashMap<>();
        response.put("questionId", savedQuestion.getQuestionId());

        // URI location = UriCreator.createUri(QUESTION_BASIC_URI, savedQuestion.getQuestionId());
        // return ResponseEntity.created(location).build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 질문 상세 내용
    @GetMapping("/questions/{question-id}")
    public ResponseEntity<QuestionDto.QuestionDetailResponse> getQuestionDetail(@PathVariable("question-id") Long questionId) {
        // 조회 및 조회수 증가
        Question findedQuestion = questionService.findQuestionDetail(questionId);
        QuestionDto.QuestionDetailResponse response = mapper.questionToQuestionDetailResponse(findedQuestion);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 질문 수정
    @PatchMapping("/questions/{question-id}")
    public ResponseEntity<QuestionDto.QuestionDetailResponse> patchQuestion(@PathVariable("question-id") Long questionId,
                                        @RequestBody QuestionDto.Patch requestDto){
        Question question = mapper.questionPatchDtoToEntity(requestDto);
        question.setQuestionId(questionId);
        Question updatedQuestion =
                questionService.updateQuestion(question, requestDto.getMemberId());

        QuestionDto.QuestionDetailResponse response = mapper.questionToQuestionDetailResponse(updatedQuestion);

        return ResponseEntity.ok().body(response);
    }

    //질문 삭제
    @DeleteMapping("/questions/{question-id}")
    public ResponseEntity<Map<String, Long>> deleteQuestion(@PathVariable("question-id") Long questionId,
                                                            HttpServletRequest request){

        Long tokenMemberId = ((Number) request.getAttribute("tokenMemberId")).longValue();
        Long deleteQuestion = questionService.deleteQuestion(questionId, tokenMemberId);
        Map<String, Long> response = new HashMap<>();
        response.put("questionId", deleteQuestion);

        return ResponseEntity.ok().body(response);
    }

    // 질문 목록
    @GetMapping("/questions")
    public ResponseEntity<QuestionDto.PageQuestionListResponse> getQuestionList(@RequestParam("page") int page,
                                          @RequestParam("sort") String orderBy) {
        Page<Question> questions = questionService.getQuestions(page, orderBy);

        QuestionDto.PageQuestionListResponse questionListPage = mapper.pageListToPageQuestionListResponse(questions);

        return new ResponseEntity<>(questionListPage, HttpStatus.OK);
    }

    // 질문 목록 : 회원이 작성한 질문
    @GetMapping("/members/{member-id}/questions")
    public ResponseEntity<QuestionDto.PageQuestionListResponse> getQuestionListByMemberId(@PathVariable("member-id") Long memberId,
                                                    @RequestParam("page") int page,
                                                    @RequestParam("sort") String orderBy) {
        Page<Question> questionListPage = questionService.getQuestionsByMember(page, orderBy, memberId);

        QuestionDto.PageQuestionListResponse response = mapper.pageListToPageQuestionListResponse(questionListPage);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}




