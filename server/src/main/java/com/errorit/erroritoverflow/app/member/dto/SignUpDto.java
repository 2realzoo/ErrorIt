package com.errorit.erroritoverflow.app.member.dto;

import com.errorit.erroritoverflow.app.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SignUpDto implements Serializable {
    private String name;
    private String email;
    private String password;
    private String findQuestion;
    private String findAnswer;

    public Member toMember() {
        return Member.builder()
                .name(name)
                .email(email)
                .password(password)
                .findQuestion(findQuestion)
                .findAnswer(findAnswer)
                .build();
    }
}
