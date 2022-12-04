package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.LcCaseExecutionStepItem;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.transaction.annotation.Transactional;

public interface LcCaseExecutionStepItemRepository extends JpaRepositoryImplementation<LcCaseExecutionStepItem, Long> {
    @Modifying
    @Transactional
    void deleteAllByExecutionId(Long executionId);
}
