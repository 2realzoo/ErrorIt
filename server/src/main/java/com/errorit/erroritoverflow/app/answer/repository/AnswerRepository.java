package com.errorit.erroritoverflow.app.answer.repository;

import com.errorit.erroritoverflow.app.answer.entity.Answer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {
    List<Answer> findAllByQuestion_QuestionIdOrderByCreatedAt(Long memberId);
    Page<Answer> findAllByMember_MemberIdOrderByCreatedAt(Long memberId, Pageable pageable);
}
