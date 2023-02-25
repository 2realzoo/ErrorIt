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
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper mapper;


    @PostMapping("/questions/{question-id}/answers")
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerDto.Post requestDto){

        Answer answer = answerService.createAnswer(
                mapper.answerPostDtoToAnswer(requestDto));

        return new ResponseEntity<>(mapper.answerEntityToResponseDto(answer)
                ,HttpStatus.OK);
    }

    @PatchMapping("/answers/{answer-id}")
    public ResponseEntity patchQuestion(@PathVariable("answer-id") @Positive long answerId,
                                        @Valid @RequestBody AnswerDto.Patch requestDto){

        requestDto.setAnswerId(answerId);
        Answer answer =
                answerService.updateAnswer(answerId,requestDto);

        return new ResponseEntity(mapper.answerEntityToResponseDto(answer), HttpStatus.OK);
    }

    @GetMapping("/answers/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id") @Positive long answerId){
        Answer answer = answerService.find(answerId);

        return new ResponseEntity(mapper.answerEntityToResponseDto(answer), HttpStatus.OK);
    }

    @GetMapping("/questions/{question-id}/answers")
    public ResponseEntity getAnswers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size){
        Page<Answer> pages = answerService.findAnswers(page-1,size);
        List<Answer> answers = pages.getContent();
        return new ResponseEntity(new MultiResponseDto<>(mapper.answerListToResponseDtoList(answers), pages)
                , HttpStatus.OK);
    }

    @DeleteMapping("/answers/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive long answerId,
                                       @PathVariable(name = "member-id") @Positive long memberId){

        answerService.deleteAnswer(answerId,memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
