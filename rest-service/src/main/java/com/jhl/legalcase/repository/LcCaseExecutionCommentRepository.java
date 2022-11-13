package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.LcCaseExecutionComment;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

public interface LcCaseExecutionCommentRepository extends JpaRepositoryImplementation<LcCaseExecutionComment, Long> {
    List<LcCaseExecutionComment> findAllByExecutionId(Long executionId);
}
