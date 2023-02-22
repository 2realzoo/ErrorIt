package com.errorit.erroritoverflow.app.answer.dto;

import lombok.*;

import javax.swing.plaf.PanelUI;
import javax.validation.constraints.NotBlank;
import java.security.PublicKey;


public class AnswerDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Response {
        private Long answerId;
        private String content;
//        private MemberDto.Response author;
//        private LocalDateTime createdAt;
//        private LocalDateTime updatedAt;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class Post{
        private String content;
    }

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class Patch{
        private long answerId;

        private String content;

        public void setAnswerId(long answerId){
            this.answerId = answerId;
        }
    }
}
