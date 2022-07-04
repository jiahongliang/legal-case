package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.LcCaseTypeStep;
import com.jhl.legalcase.entity.LcCaseTypeStepItem;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

/**
 * @author
 */
public interface LcCaseTypeStepItemRepository extends JpaRepositoryImplementation<LcCaseTypeStepItem, Long> {
    /**
     * 根据id删除
     *
     * @param caseTypeSteps
     * @param ids
     */
    void deleteAllByCaseTypeStepInAndIdNotIn(List<LcCaseTypeStep> caseTypeSteps, List<Long> ids);

    /**
     * 根据步骤删除item
     *
     * @param caseTypeSteps
     */
    void deleteAllByCaseTypeStepIn(List<LcCaseTypeStep> caseTypeSteps);
}
