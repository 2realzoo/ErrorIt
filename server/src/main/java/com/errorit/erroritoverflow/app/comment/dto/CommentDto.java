package com.errorit.erroritoverflow.app.comment.dto;

import lombok.*;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentDto {
    // 댓글 추가 요청
    @Getter
    @Setter
    public static class Post{
        private Long memberId;
        private String content;
    }

    // 댓글 수정 요청
    @Getter
    @Setter
    public static class Patch{
        private Long memberId;
        private String content;
    }

    // 댓글 삭제 요청
    @Getter
    @Setter
    public static class Delete{
        private Long memberId;
    }

    // 댓글 응답
    @Getter
    @Setter
    public static class CommentResponse {
        private Long commentId;
        private String content;
        private String member;
        private LocalDateTime createdAt;
    }
}
