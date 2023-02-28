package com.errorit.erroritoverflow.app.member.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MemberQuestionsDto {
    private Long questionId;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String member;
    private String content;
    // private List<Tag> tags;
    private Long viewCount;
}
