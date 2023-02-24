package com.errorit.erroritoverflow.app.member.entity;

import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.audit.Auditable;
import com.errorit.erroritoverflow.app.auth.refresh.entity.RefreshToken;
import com.errorit.erroritoverflow.app.comment.entity.Comment;
import com.errorit.erroritoverflow.app.image.entity.Image;
import com.errorit.erroritoverflow.app.question.entity.Question;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_ID")
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "IMAGE_ID")
    private Image image;

    @Column
    private String name;

    @Column
    private String intro;

    @Email
    @Column(unique = true)
    private String email;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Column
    private String password;

    @Column
    private String findQuestion;

    @Column
    private String findAnswer;

    // 질문
    @OneToMany(mappedBy = "member")
    private List<Question> questions = new ArrayList<>();

    // 답변
    @OneToMany(mappedBy = "member")
    private List<Answer> answers = new ArrayList<>();

    // 댓글
    @OneToMany(mappedBy = "member")
    private List<Comment> comments = new ArrayList<>();

    @OneToOne(mappedBy = "member")
    private RefreshToken refreshToken;
}