package com.errorit.erroritoverflow.app.question.dto;

import com.errorit.erroritoverflow.app.member.dto.MemberDto;
import com.errorit.erroritoverflow.app.question.entity.Question;
import lombok.*;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class QuestionDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class Post{
        @NotBlank
        private String title;

        @NotBlank
        private String content;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Patch{
        private long questionId;

        @NotBlank
        private String title;

        @NotBlank
        private String content;

        public void setQuestionId(long questionId) {
            this.questionId = questionId;
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private Long questionId;
        private MemberDto.MemberDetailResponse author;
        private String title;
        private String content;
        private Long views;
        private int answerCount;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SimpleResponse {
        private Long questionId;
        private MemberDto.MemberDetailResponse author;
        private String title;
        private String content;
        private Long views;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}
