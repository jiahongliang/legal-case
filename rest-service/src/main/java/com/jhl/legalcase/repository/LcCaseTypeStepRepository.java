package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.LcCaseType;
import com.jhl.legalcase.entity.LcCaseTypeStep;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

/**
 * @author
 */
public interface LcCaseTypeStepRepository extends JpaRepositoryImplementation<LcCaseTypeStep, Long> {
    /**
     * 根据类别删除已经不存在的步骤
     *
     * @param caseType
     * @param ids
     */
    void deleteByCaseTypeAndIdNotIn(LcCaseType caseType, List<Long> ids);
}
