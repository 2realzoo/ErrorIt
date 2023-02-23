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
//        Answer answer = mapper.answerPostDtoToAnswer(requestDto);
//        Answer createdAnswer = answerService.createAnswer(answer);
//        return new ResponseEntity<>(mapper.answerEntityToResponseDto(answer)
//                , HttpStatus.OK);
        Answer answer = mapper.answerPostDtoToAnswer(requestDto);
        Member member = new Member();
        member.setId(requestDto.getMemberId());
        answer.setMember(member);
        Answer created = answerService.createAnswer(answer);
        return new ResponseEntity(mapper.answerEntityToResponseDto(created), HttpStatus.CREATED);
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchQuestion(@PathVariable("answer-id") @Positive long answerId,
                                        @Valid @RequestBody AnswerDto.Patch requestDto){

        // mapper로 변환
        Answer answer = mapper.answerPatchDtoToAnswer(requestDto);
        // answerId 설정
        answer.setAnswerId(answerId);

        AnswerDto.Response response = mapper.answerEntityToResponseDto(answerService.updateAnswer(answer));

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id") @Positive long answerId){
        Answer answer = answerService.findAnswer(answerId);

        return new ResponseEntity(mapper.answerEntityToResponseDto(answer), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAnswers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size){
        Page<Answer> pages = answerService.findAnswers(page-1,size);
        List<Answer> answers = pages.getContent();
        return new ResponseEntity(new MultiResponseDto<>(mapper.answersToAnswersResponseDto(answers), pages)
                , HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive long answerId){

        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
