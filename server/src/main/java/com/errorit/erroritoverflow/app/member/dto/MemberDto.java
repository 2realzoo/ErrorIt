package com.errorit.erroritoverflow.app.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberDto {
    private Long memberId;
    private String url;
    private String intro;
    private String name;
    private String email;
}
