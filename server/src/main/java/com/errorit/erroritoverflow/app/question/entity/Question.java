package com.errorit.erroritoverflow.app.question.entity;

import com.errorit.erroritoverflow.app.audit.Auditable;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionId;

    //작성자
//    @ManyToOne
//    @JoinColumn
//    private Member author;

    //질문 제목
    @Column
    private String title;
    
    //질문 내용
    @Column
    private String content;

    //질문 조회수
//    @Column(name = "VIEW_COUNT")
//    private long views;

    //질문에 달리는 답변
//    @Builder.Default
//    @OneToMany(mappedBy = "question", cascade = {CascadeType.REMOVE})
//    private List<Answer> answers = new ArrayList<>();

    //질문에 달리는 답변수
//    public int getAnswerCount() {
//        return this.answers.size();
//    }
}
