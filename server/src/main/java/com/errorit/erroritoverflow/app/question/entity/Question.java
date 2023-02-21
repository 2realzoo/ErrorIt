package com.errorit.erroritoverflow.app.question.entity;

import com.errorit.erroritoverflow.app.exception.BusinessLogicException;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import lombok.*;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
@ToString
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "QUESTION_ID")
    private Long questionId;

    //질문 제목
    @Column
    private String title;
    
    //질문 내용
    @Column
    private String content;

}
