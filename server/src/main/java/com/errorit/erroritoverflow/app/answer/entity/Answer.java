package com.errorit.erroritoverflow.app.answer.entity;


import com.errorit.erroritoverflow.app.audit.Auditable;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.question.entity.Question;
import lombok.*;
import javax.persistence.*;

@Entity
@Getter
@Setter
public class Answer extends Auditable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column
    private String title;

    @Column
    private String content;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

}