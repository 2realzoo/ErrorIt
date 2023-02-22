package com.errorit.erroritoverflow.app.question.controller;

import antlr.Lookahead;
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
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
@Slf4j
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper mapper;

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post requestDto) {

        Question question = mapper.questionPostDtoToEntity(requestDto);

        return new ResponseEntity<>(mapper.questionEntityToResponseDto(question)
                ,HttpStatus.OK);
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive long questionId,
                                        @RequestBody QuestionDto.Patch requestDto){

        requestDto.setQuestionId(questionId);
        Question question =
                questionService.updateQuestion(mapper.questionPatchDtoToEntity(requestDto));

        return new ResponseEntity<>(mapper.questionEntityToResponseDto(question)
                ,HttpStatus.OK);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive long questionId){

        Question response = questionService.findQuestion(questionId);

        return new ResponseEntity<>(mapper.questionEntityToResponseDto(response)
                , HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity getQuestions(int page,int size){
//        Page<Question> pagedQuestions = questionService.findQuestions(page - 1, size);
//        List<Question> questions = pagedQuestions.getContent();
//        //return MultiResponseDto.of(mapper.entityListToResponseDtoList(questions), pagedQuestions);
//    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive long questionId){

        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
