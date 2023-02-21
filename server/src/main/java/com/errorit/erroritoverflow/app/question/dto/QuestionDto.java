package com.errorit.erroritoverflow.app.question.dto;

import com.errorit.erroritoverflow.app.question.entity.Question;
import lombok.*;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class QuestionDto {

    //질문 제목
    @NotBlank(message = "제목을 작성해 주세요.")
    private String title;

    //질문 내용
    @NotBlank(message = "질문을 작성해 주세요.")
    private String content;

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post{
        private String title;

        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch{
        private long questionId;

        private String title;

        private String content;

        public void setQuestionId(long questionId) {
            this.questionId = questionId;
        }
    }

}
