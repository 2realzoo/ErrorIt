package com.errorit.erroritoverflow.app.question.repository;

import com.errorit.erroritoverflow.app.question.entity.Question;
import lombok.ToString;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    Optional<Question> findByTitle(String title);

    //페이지네이션
    //Page<Question> findAllByTitleContainsOrContentContains(String title, String content, Pageable pageable);

}
