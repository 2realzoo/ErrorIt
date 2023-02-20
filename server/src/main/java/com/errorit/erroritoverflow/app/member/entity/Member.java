package com.errorit.erroritoverflow.app.member.entity;

import com.errorit.erroritoverflow.app.audit.Auditable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends Auditable {

    @Id
    @GeneratedValue
    @Column(name = "MEMBER_ID")
    private Long id;

    @OneToMany
    private List<Image> image;

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

    // 매핑 정보에 따라 아래에 필드들이 더 추가되어야함
    // ex : 맴버가 등록한 질문
    // ex : 맴버가 등록한 답변
}