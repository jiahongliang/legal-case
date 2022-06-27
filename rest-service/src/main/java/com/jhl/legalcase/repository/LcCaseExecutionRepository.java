package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.LcCaseExecution;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

public interface LcCaseExecutionRepository extends JpaRepositoryImplementation<LcCaseExecution, Long> {
}
