package com.errorit.erroritoverflow.app.answer.mapper;

import com.errorit.erroritoverflow.app.answer.dto.AnswerDto;
import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring" ,unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {
    Answer answerPostDtoToAnswer(AnswerDto.Post requestBody);
    Answer answerPatchDtoToAnswer(AnswerDto.Patch requestBody);
    //AnswerDto.Response answerEntityToResponseDto(Answer answer);

    default AnswerDto.Response answerEntityToResponseDto(Answer answer) {
        Member member = answer.getMember();

        return AnswerDto.Response.builder()
                .answerId(answer.getAnswerId())
                .memberId(answer.getMember().getId())
                .member(answer.getMember().getName())
                .questionId(answer.getQuestion().getQuestionId())
                .content(answer.getContent())
                .createdAt(answer.getCreatedAt())
                .updatedAt(answer.getModifiedAt())
                //.comments(commentResponse)
                .build();
    }

    List<AnswerDto.Response> answerListToResponseDtoList(List<Answer> answers);
}
