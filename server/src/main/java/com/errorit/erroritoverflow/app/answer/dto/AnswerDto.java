package com.errorit.erroritoverflow.app.answer.dto;

import com.errorit.erroritoverflow.app.comment.dto.CommentDto;
import com.errorit.erroritoverflow.app.common.pagenation.PageInfo;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;


public class AnswerDto {

    // 답글 추가
    @Getter
    @Setter
    public static class Post {
        private long memberId;
        private String content;
    }

    // 답글 수정
    @Setter
    @Getter
    public static class Patch {
        private long memberId;
        private String content;
    }

    // 답글 삭제
    @Setter
    @Getter
    public static class Delete {
        private long memberId;
    }

    // 답글 응답
    @Getter
    @Setter
    public static class AnswerResponse {
        private Long answerId;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private String member;
        private String content;
        private List<CommentDto> comments;
    }

    // 답글 목록 응답
    @Getter
    @Setter
    public static class AnswerListResponse {
        private List<AnswerResponse> answers;
    }

    // 회원이 작성한 답글 목록 응답
    @Getter
    @Setter
    public static class MemberAnswerListResponse {
        private PageInfo pageInfo;
        private List<AnswerResponse> answers;
    }
}
