package com.errorit.erroritoverflow.app.answer.repository;

import com.errorit.erroritoverflow.app.answer.entity.Answer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {
    Page<Answer> findAllByQuestion_QuestionIdOrderByCreatedAt(Long memberId, Pageable pageable);
    Page<Answer> findAllByMember_MemberIdOrderByCreatedAt(Long memberId, Pageable pageable);
}
