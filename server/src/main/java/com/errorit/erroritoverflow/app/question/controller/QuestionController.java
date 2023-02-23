package com.errorit.erroritoverflow.app.question.controller;

import com.errorit.erroritoverflow.app.common.response.MultiResponseDto;
import com.errorit.erroritoverflow.app.member.service.MemberService;
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

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
@Slf4j
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper mapper;

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post requestDto) {

        Question question = questionService.createQuestion(
                mapper.questionPostDtoToEntity(requestDto));


        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(question)
                ,HttpStatus.OK);
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive long questionId,
                                        @RequestBody QuestionDto.Patch requestDto){

        requestDto.setQuestionId(questionId);
        Question question =
                questionService.updateQuestion(questionId,requestDto);

        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(question)
                ,HttpStatus.OK);
    }

    // 질문 상세 페이지
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive long questionId){

        Question response = questionService.find(questionId);

        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(response)
                , HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getQuestions(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {
        Page<Question> pageQuestions = questionService.findQuestions(page - 1, size);
        List<Question> questions = pageQuestions.getContent();

        return new ResponseEntity<>(new MultiResponseDto(mapper.QuestionListToResponseDtoList(questions),
                pageQuestions),HttpStatus.OK);
    }


    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive long questionId,
                                         @PathVariable(name = "member-id") @Positive long memberId){

        questionService.deleteQuestion(questionId,memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
