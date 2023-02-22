package com.errorit.erroritoverflow.app.question.entity;

import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.audit.Auditable;
import com.errorit.erroritoverflow.app.member.entity.Member;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@SuperBuilder
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
    @Column(name = "VIEW_COUNT")
    private int count;

    //작성자를 member에서 가져옴
    //연관관계
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    //질문에 달리는 답변 리스트
    @Builder.Default
    @OneToMany(mappedBy = "question", cascade = {CascadeType.REMOVE})
    private List<Answer> answers = new ArrayList<>();
    
    //질문에 달리는 답변수
    public int getAnswerCount() {
        return this.answers.size();
    }
}
