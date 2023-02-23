package com.errorit.erroritoverflow.app.answer.dto;

import lombok.*;

import javax.swing.plaf.PanelUI;
import javax.validation.constraints.NotBlank;
import java.security.PublicKey;
import java.time.LocalDateTime;


public class AnswerDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private Long answerId;
        private Long memberId;
        private Long questionId;
        private String member;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

    }

    @Getter
    @Setter
    public static class Post{
        private long memberId;
        private long questionId;
        private String content;
    }

    @Setter
    @Getter
    public static class Patch{
        private long answerId;

        private String content;

        public void setAnswerId(long answerId){
            this.answerId = answerId;
        }
    }
}
