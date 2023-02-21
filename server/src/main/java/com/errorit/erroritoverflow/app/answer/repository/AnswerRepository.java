package com.errorit.erroritoverflow.app.answer.repository;

import com.errorit.erroritoverflow.app.answer.entity.Answer;
import org.springframework.data.repository.CrudRepository;

public interface AnswerRepository extends CrudRepository<Answer,Long> {
}
