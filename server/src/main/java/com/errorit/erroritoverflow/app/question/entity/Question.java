package com.errorit.erroritoverflow.app.question.entity;

import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.audit.Auditable;
import com.errorit.erroritoverflow.app.comment.entity.Comment;
import com.errorit.erroritoverflow.app.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Question extends Auditable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionId;

    //질문 제목
    @Column
    private String title;

    //질문 내용
    @Column
    private String content;

    //질문 조회수
    @Column
    private Long viewCount;

    //작성자를 member에서 가져옴
    //연관관계
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    //질문에 달리는 답변 리스트
    @OneToMany(mappedBy = "question", cascade = {CascadeType.REMOVE})
    private List<Answer> answers = new ArrayList<>();

    //질문에 달리는 댓글 리스트
    @OneToMany(mappedBy = "question", cascade = {CascadeType.REMOVE})
    private List<Comment> comments = new ArrayList<>();
}
