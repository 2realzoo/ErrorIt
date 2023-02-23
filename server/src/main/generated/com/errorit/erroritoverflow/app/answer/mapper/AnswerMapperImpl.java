package com.errorit.erroritoverflow.app.answer.mapper;

import com.errorit.erroritoverflow.app.answer.dto.AnswerDto;
import com.errorit.erroritoverflow.app.answer.entity.Answer;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-02-23T13:33:45+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class AnswerMapperImpl implements AnswerMapper {

    @Override
    public Answer answerPostDtoToAnswer(AnswerDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Answer answer = new Answer();

        return answer;
    }

    @Override
    public Answer answerPatchDtoToAnswer(AnswerDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Answer answer = new Answer();

        return answer;
    }

    @Override
    public AnswerDto.Response answerEntityToResponseDto(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        AnswerDto.Response response = new AnswerDto.Response();

        return response;
    }
}
