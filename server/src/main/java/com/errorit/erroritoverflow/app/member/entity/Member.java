package com.errorit.erroritoverflow.app.member.entity;

import com.errorit.erroritoverflow.app.audit.Auditable;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends Auditable {

    @Id
    @GeneratedValue
    @Column(name = "MEMBER_ID")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IMAGE_ID")
    private Image image;

    @Column
    private String name;

    @Column
    private String intro;

    @Email
    private String email;

    @Column
    private String password; // 패스워드 가져도 되나 ? 시큐리티 영향있어서 추후 결정

    @Column
    private String findQuestion;

    @Column
    private String findAnswer;

    @Builder
    public Member(String name, String email, String password, String findQuestion, String findAnswer) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.findQuestion = findQuestion;
        this.findAnswer = findAnswer;
    }

}