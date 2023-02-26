package com.errorit.erroritoverflow.app.question.entity;

import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.audit.Auditable;
import com.errorit.erroritoverflow.app.comment.entity.Comment;
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
    @Column(name = "VIEW_COUNT")
    private long viewCount;


    //작성자를 member에서 가져옴
    //연관관계
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    //answer와의 관계
    @ManyToOne
    @JoinColumn(name = "ANSWER_ID")
    private Answer answer;

    @ManyToOne
    @JoinColumn(name = "COMMENT_ID")
    private Comment comment;

    //질문에 달리는 답변 리스트
    @OneToMany(mappedBy = "question", cascade = {CascadeType.REMOVE})
    private List<Answer> answers = new ArrayList<>();

    //질문에 달리는 댓글 리스트
    @OneToMany(mappedBy = "question", cascade = {CascadeType.REMOVE})
    private List<Comment> comments = new ArrayList<>();
}
