package com.errorit.erroritoverflow.app.question.repository;

import com.errorit.erroritoverflow.app.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findAllByMember_MemberIdOrderByCreatedAtDesc(Long member, Pageable pageable);
    Page<Question> findAllByMember_MemberIdOrderByViewCountDesc(Long member, Pageable pageable);
}
