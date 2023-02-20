package com.errorit.erroritoverflow.app.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateMemberDto {
    private String name;
    private String intro;
}
