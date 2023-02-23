package com.errorit.erroritoverflow.app.comment.repository;

import com.errorit.erroritoverflow.app.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends JpaRepository<Comment,Long> {

}
