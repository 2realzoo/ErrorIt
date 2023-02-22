package com.errorit.erroritoverflow.app.answer.entity;


import com.errorit.erroritoverflow.app.audit.Auditable;
import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column
    private String content;

//    @ManyToOne
//    @JoinColumn(name = "author_id")
//    private Member author;

//    @ManyToOne
//    @JoinColumn(name = "question_id")
//    private Question question;

}