package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.LcSubjectItem;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

/**
 * @author
 */
public interface LcSubjectItemRepository extends JpaRepositoryImplementation<LcSubjectItem, Long> {
    /**
     * 根据主题id删除
     *
     * @param subjectId
     */
    void deleteAllBySubjectId(Long subjectId);
}
