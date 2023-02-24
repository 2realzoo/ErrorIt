package com.errorit.erroritoverflow.app.question.entity;

import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.audit.Auditable;
import com.errorit.erroritoverflow.app.member.entity.Member;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Question{

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

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false, name = "MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();


    //작성자를 member에서 가져옴
    //연관관계
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member){
        this.member = member;
        if(!this.member.getQuestions().contains(this)){
            this.member.getQuestions().add(this);
        }
    }
    public Question(Member member){
        this.member = member;
    }


    //질문에 달리는 답변 리스트
    @OneToMany(mappedBy = "question", cascade = {CascadeType.REMOVE})
    private List<Answer> answers = new ArrayList<>();

    public void setAnswer(Answer answer){
        answers.add(answer);
        if(answer.getQuestion() != this){
            answer.setQuestion(this);
        }
    }

    //질문에 달리는 답변수
    public int getAnswerCount() {
        return this.answers.size();
    }
}
