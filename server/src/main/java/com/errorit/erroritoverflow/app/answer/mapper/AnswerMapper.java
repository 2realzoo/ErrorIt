package com.errorit.erroritoverflow.app.answer.mapper;

import com.errorit.erroritoverflow.app.answer.entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {
    Answer questionPostDtoToQuestion(AnswerDto.Post requestBody);
    Answer questionPatchDtoToQuestion(AnswerDto.Patch requestBody);
    QuestionResponseDto questionToQuestionResponseDto(Answer answer);
}
