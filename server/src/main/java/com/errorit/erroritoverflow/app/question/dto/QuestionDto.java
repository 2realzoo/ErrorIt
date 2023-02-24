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

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private Long questionId;
        private Long memberId;
        private String member;
        private String title;
        private String content;
        private Long views;
        private int answerCount;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private List<AnswerDto.Response> answers;
        private List<CommentDto.Response> comments;
    }


}
