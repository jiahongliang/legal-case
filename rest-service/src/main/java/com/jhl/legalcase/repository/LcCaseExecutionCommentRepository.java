package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.LcCaseExecutionComment;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LcCaseExecutionCommentRepository extends JpaRepositoryImplementation<LcCaseExecutionComment, Long> {
    List<LcCaseExecutionComment> findAllByExecutionId(Long executionId);

    @Modifying
    @Transactional
    void deleteAllByExecutionId(Long executionId);

    @Modifying
    @Transactional
    void deleteAllByIdNotInAndExecutionId(List exclusiveIdList, Long executionId);
}
