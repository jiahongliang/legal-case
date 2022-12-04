package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.LcCaseExecutionSuspect;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.transaction.annotation.Transactional;

public interface LcCaseExecutionSuspectRepository extends JpaRepositoryImplementation<LcCaseExecutionSuspect, Long> {
    @Modifying
    @Transactional
    void deleteAllByExecutionId(Long executionId);
}
