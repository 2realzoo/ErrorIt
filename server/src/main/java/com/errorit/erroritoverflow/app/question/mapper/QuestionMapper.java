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

    Question questionPostDtoToEntity(QuestionDto.Post requestBody);
    Question questionPatchDtoToEntity(QuestionDto.Patch requestBody);
    //QuestionDto.Response questionToQuestionResponseDto(Question question);


    default QuestionDto.Response questionToQuestionResponseDto(Question question) {
        Member member = question.getMember();

        return QuestionDto.Response.builder()
                .questionId(question.getQuestionId())
                .memberId(question.getMember().getId())
                .member(question.getMember().getName())
                .content(question.getContent())
                .createdAt(question.getCreatedAt())
                .updatedAt(question.getModifiedAt())
                .build();
    }

    List<QuestionDto.Response> QuestionListToResponseDtoList(List<Question> questions);
}
