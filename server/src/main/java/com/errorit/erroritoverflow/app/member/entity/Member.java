package com.errorit.erroritoverflow.app.member.entity;

import com.errorit.erroritoverflow.app.audit.Auditable;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_ID")
    private Long id;

    // 이미지 entity 추가 해야함
    // private Image image;

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