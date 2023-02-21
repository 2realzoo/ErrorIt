package com.errorit.erroritoverflow.app.question.dto;

import lombok.*;

@Getter
@Setter
public class QuestionResponseDto {
    private long questionId;
    private String title;
    private String content;
}
