package com.errorit.erroritoverflow.app.comment.repository;

import com.errorit.erroritoverflow.app.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findByQuestion_QuestionId(Long questionId);
    List<Comment> findByAnswer_AnswerId(Long answerId);
}
