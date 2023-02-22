package com.errorit.erroritoverflow.app.question.mapper;


import com.errorit.erroritoverflow.app.question.dto.QuestionDto;
import com.errorit.erroritoverflow.app.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {

    Question questionPostDtoToEntity(QuestionDto.Post requestBody);
    Question questionPatchDtoToEntity(QuestionDto.Patch requestBody);
    QuestionDto.Response questionEntityToResponseDto(Question question);

    List<QuestionDto.Response> entityListToResponseDtoList(List<Question> questions);

    //QuestionDto.DetailResponse entityToDetailResponseDto(Question question);

    QuestionDto.SimpleResponse entityToSimpleResponseDto(Question question);
}
