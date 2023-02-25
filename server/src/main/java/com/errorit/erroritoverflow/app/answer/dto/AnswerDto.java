package com.errorit.erroritoverflow.app.answer.dto;

import lombok.*;

import javax.swing.plaf.PanelUI;
import javax.validation.constraints.NotBlank;
import java.security.PublicKey;
import java.time.LocalDateTime;


public class AnswerDto {
    @Getter
    @Setter
    public static class Post{
        private long memberId;
        private long questionId;
        private String title;
        private String content;
    }

    @Setter
    @Getter
    public static class Patch{
        private long answerId;
        private String title;
        private String content;

        public void setAnswerId(long answerId){
            this.answerId = answerId;
        }
    }

    //답변 리스트
    @Setter
    @Getter
    public static class AnswerResponse {
        private Long answerId;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private String member;
        private String title;
        private String content;
    }

    //답변 상세
    @Setter
    @Getter
    public static class AnswerDetailResponse {
        private Long answerId;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private String member;
        private String title;
        private String content;
    }

}
