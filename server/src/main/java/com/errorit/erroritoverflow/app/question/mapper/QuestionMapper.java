package com.errorit.erroritoverflow.app.question.mapper;


import com.errorit.erroritoverflow.app.answer.dto.AnswerDto;
import com.errorit.erroritoverflow.app.answer.entity.Answer;
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
    QuestionDto.Response questionToQuestionResponseDto(Question question);


//    @Mapping(source = "member.name", target = "member")
//    QuestionDto.Response questionToQuestionResponseDto(Question question);

//    default QuestionDto.Response questionToQuestionResponseDto(Question question) {
//        Member member = question.getMember();
//        List<Answer> answers = question.getAnswers();
//
//        List<AnswerDto.Response> answerResponse = answers.stream()
//                        .map(answer ->
//                                new AnswerDto.Response(
//                                        answer.getAnswerId(),
//                                        answer.getMember().getId(),
//                                        answer.getMember().getName(),
//                                        answer.getQuestion().getQuestionId(),
//                                        answer.getContent(),
//                                        answer.getCreatedAt(),
//                                        answer.getModifiedAt())).collect(Collectors.toList());
//
//        return QuestionDto.Response.builder()
//                .questionId(question.getQuestionId())
//                .member(question.getMember().getName())
//                .title(question.getTitle())
//                .createdAt(question.getCreatedAt())
//                .updatedAt(question.getModifiedAt())
//                .answers(answerResponse)
//                .build();
//    }

    List<QuestionDto.Response> entityListToResponseDtoList(List<Question> questions);
}
