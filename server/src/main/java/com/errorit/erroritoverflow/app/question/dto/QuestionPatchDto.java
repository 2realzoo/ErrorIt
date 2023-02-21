package com.errorit.erroritoverflow.app.question.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class QuestionPatchDto {
    private long questionId;

    @NotBlank
    private  String title;

    @NotBlank
    private String content;

    public long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(long questionId) {
        this.questionId = questionId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
