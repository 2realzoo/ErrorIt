package com.errorit.erroritoverflow.app.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SignUpDto {
    private String name;
    private String email;
    private String password;
    private String findQuestion;
    private String findAnswer;
}
