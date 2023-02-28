package com.errorit.erroritoverflow.app.member.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MemberAnswersDto {
    private Long answerId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String member;
    private String content;
}
