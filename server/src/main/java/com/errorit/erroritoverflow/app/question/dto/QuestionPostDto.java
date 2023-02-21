package com.errorit.erroritoverflow.app.question.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class QuestionPostDto {
    @NotBlank
    private String title;

    @NotBlank
    private String content;
}
