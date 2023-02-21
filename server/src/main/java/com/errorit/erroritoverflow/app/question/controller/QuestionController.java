package com.errorit.erroritoverflow.app.question.controller;

import com.errorit.erroritoverflow.app.question.dto.QuestionDto;
import com.errorit.erroritoverflow.app.question.dto.QuestionPatchDto;
import com.errorit.erroritoverflow.app.question.dto.QuestionPostDto;
import com.errorit.erroritoverflow.app.question.dto.QuestionResponseDto;
import com.errorit.erroritoverflow.app.question.entity.Question;
import com.errorit.erroritoverflow.app.question.mapper.QuestionMapper;
import com.errorit.erroritoverflow.app.question.service.QuestionService;
import com.errorit.erroritoverflow.app.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/questions")
@Validated
@Slf4j
public class QuestionController {
    private final static String QUESTION_DEFAULT_URL = "/questions";
    private final QuestionService questionService;
    private final QuestionMapper mapper;

    public QuestionController(QuestionService questionService,
                              QuestionMapper mapper){
        this.questionService = questionService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post requestBody) {

        Question question = questionService.createQuestion(mapper.questionPostDtoToQuestion(requestBody));
        log.info("question = {}",  question);

        //URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, question.getQuestionId());

        //return ResponseEntity.created(location).build();
        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(question)
                ,HttpStatus.OK);
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive long questionId,
                                        @Valid @RequestBody QuestionDto.Patch requestBody){

        requestBody.setQuestionId(questionId);

        Question response =
                questionService.updateQuestion(mapper.questionPatchDtoToQuestion(requestBody));

        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(response)
                ,HttpStatus.OK);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive long questionId){

        Question response = questionService.findQuestion(questionId);

        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(response)
                , HttpStatus.OK);
    }

//    public ResponseEntity getQuestions(){
//
//        List<Question> questions = questionService.findQuestions();
//
//        List<QuestionResponseDto> response =
//                questions.stream()
//                        .map(question -> mapper.questionToQuestionResponseDto(question))
//                        .collect(Collectors.toList());
//
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive long questionId){

        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
