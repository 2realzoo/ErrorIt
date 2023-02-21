package com.errorit.erroritoverflow.app.question.mapper;


import com.errorit.erroritoverflow.app.question.dto.QuestionDto;
import com.errorit.erroritoverflow.app.question.dto.QuestionPatchDto;
import com.errorit.erroritoverflow.app.question.dto.QuestionPostDto;
import com.errorit.erroritoverflow.app.question.dto.QuestionResponseDto;
import com.errorit.erroritoverflow.app.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {

    Question questionPostDtoToQuestion(QuestionDto.Post requestBody);
    Question questionPatchDtoToQuestion(QuestionDto.Patch requestBody);
    QuestionResponseDto questionToQuestionResponseDto(Question question);
}
