package com.errorit.erroritoverflow.app.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PasswordDto {
    private Long memberId;
    private String password;
}
