package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.LcCaseExecution;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

public interface LcCaseExecutionRepository extends JpaRepositoryImplementation<LcCaseExecution, Long> {
    /**
     * 查找符合条件的记录
     *
     * @return
     */
    List<LcCaseExecution> findAllByNameSearchIsNull();
}
