package com.errorit.erroritoverflow.app.question.mapper;


import com.errorit.erroritoverflow.app.answer.dto.AnswerDto;
import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.comment.dto.CommentDto;
import com.errorit.erroritoverflow.app.comment.entity.Comment;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.question.dto.QuestionDto;
import com.errorit.erroritoverflow.app.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {

    // Post -> question
    Question questionPostDtoToEntity(QuestionDto.Post requestBody);

    // Patch -> question
    Question questionPatchDtoToEntity(QuestionDto.Patch requestBody);

    // question -> questionDetail
    @Mapping(source = "member.id", target = "member")
    QuestionDto.QuestionDetailResponse questionDetailResponseDto(Question question);

    //entity에서 member가 Member형식이라 오류남
    //Question 엔티티의 member를 QuestionDto.QuestionResponse의 member로 매핑
    @Mapping(source = "member.id", target = "member")
    QuestionDto.QuestionResponse questionToResponseDto(Question question);
    List<QuestionDto.QuestionResponse> QuestionListToResponseDtoList(List<Question> questions);
}
