package com.errorit.erroritoverflow.app.question.dto;

import com.errorit.erroritoverflow.app.answer.dto.AnswerDto;
import com.errorit.erroritoverflow.app.comment.dto.CommentDto;
import com.errorit.erroritoverflow.app.member.dto.MemberDto;
import com.errorit.erroritoverflow.app.question.entity.Question;
import lombok.*;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class QuestionDto {

    @Getter
    @Setter
    public static class Post{
        private long memberId;

        @NotBlank
        private String title;

        @NotBlank
        private String content;
    }

    @Getter
    @Setter
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

    //질문 리스트
    @Getter
    @Setter
    public static class QuestionResponse {
        private Long questionId;
        private String title;
        private String content;
        private String member;
        private Long viewCount;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

    //질문 상세
    @Getter
    @Setter
    public static class QuestionDetailResponse {
        private Long questionId;
        private String title;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private String member;
        private String content;
        private Long viewCount;
        private List<CommentDto.Response> comments;
    }

}
