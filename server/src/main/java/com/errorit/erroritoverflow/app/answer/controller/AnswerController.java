package com.errorit.erroritoverflow.app.answer.controller;

import com.errorit.erroritoverflow.app.answer.dto.AnswerDto;
import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.answer.mapper.AnswerMapper;
import com.errorit.erroritoverflow.app.answer.service.AnswerService;
import com.errorit.erroritoverflow.app.question.dto.QuestionDto;
import com.errorit.erroritoverflow.app.question.entity.Question;
import com.errorit.erroritoverflow.app.question.mapper.QuestionMapper;
import com.errorit.erroritoverflow.app.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/answers")
@Validated
@Slf4j
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper mapper;

    public AnswerController(AnswerService answerService,
                            AnswerMapper mapper){
        this.answerService = answerService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerDto.Post requestDto){
        log.info("requestDto = {}",  requestDto);

        log.info("mapperanswer = {}", mapper.answerPostDtoToAnswer(requestDto));
        Answer answer = mapper.answerPostDtoToAnswer(requestDto);

        Answer createdAnswer = answerService.createAnswer(answer);
        log.info("answer = {}",  answer);

        return new ResponseEntity<>(mapper.answerEntityToResponseDto(answer)
                , HttpStatus.OK);
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchQuestion(@PathVariable("answer-id") @Positive long answerId,
                                        @Valid @RequestBody AnswerDto.Patch requestDto){

        requestDto.setAnswerId(answerId);

        Answer response =
                answerService.updateAnswer(mapper.answerPatchDtoToAnswer(requestDto));

        return new ResponseEntity<>(mapper.answerEntityToResponseDto(response)
                ,HttpStatus.OK);
    }


    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive long answerId){

        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
