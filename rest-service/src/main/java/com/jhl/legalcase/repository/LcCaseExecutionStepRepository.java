package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.LcCaseExecutionStep;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.transaction.annotation.Transactional;

public interface LcCaseExecutionStepRepository extends JpaRepositoryImplementation<LcCaseExecutionStep, Long> {
    @Modifying
    @Transactional
    void deleteAllByExecutionId(Long executionId);
}
