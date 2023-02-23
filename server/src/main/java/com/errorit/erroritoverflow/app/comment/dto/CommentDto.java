package com.errorit.erroritoverflow.app.comment.dto;

import lombok.*;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class Post{
        private String content;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Patch{
        private long commentId;

        private String content;

        public void setCommentId(long commentId) {
            this.commentId = commentId;
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private Long commentId;
        private Long memberId;
        private String content;
        private String member;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}
