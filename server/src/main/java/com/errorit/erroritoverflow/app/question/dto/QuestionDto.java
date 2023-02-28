package com.errorit.erroritoverflow.app.question.dto;

import com.errorit.erroritoverflow.app.comment.dto.CommentDto;
import com.errorit.erroritoverflow.app.common.pagenation.PageInfo;
import lombok.*;


import java.time.LocalDateTime;
import java.util.List;

public class QuestionDto {

    // 요청 : 질문 추가
    @Getter
    @Setter
    public static class Post{
        private Long memberId;
        private String title;
        private String content;
    }

    // 요청 : 질문 수정
    @Getter
    @Setter
    public static class Patch{
        private Long memberId;
        private String title;
        private String content;
    }

    // 요청 : 질문 삭제
    @Getter
    @Setter
    public static class Delete {
        private Long memberId;
    }

    // 응답 : 질문 상세
    @Getter
    @Setter
    public static class QuestionDetailResponse {
        private Long questionId;
        private Long ownerId;
        private String title;
        private String content;
        private String ownerName;
        private Long viewCount;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private List<CommentDto.CommentResponse> comments;
    }

    // 응답 : 질문 목록
    @Getter
    @Setter
    public static class PageQuestionListResponse {
        private PageInfo pageInfo;
        private List<QuestionElementResponse> questions;
    }

    // 질문 목록 응답에 포함될 응답 객체
    @Getter
    @Setter
    public static class QuestionElementResponse {
        private Long questionId;
        private Long ownerId;
        private String title;
        private String content;
        private String ownerName;
        private Long viewCount;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private int answers; // 답글 수
    }
}
