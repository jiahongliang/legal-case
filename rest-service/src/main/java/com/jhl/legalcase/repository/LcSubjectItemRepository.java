package com.jhl.legalcase.repository;

import com.jhl.legalcase.dataInterface.repository.DataProviderRepository;
import com.jhl.legalcase.entity.LcSubjectItem;

/**
 * @author
 */
public interface LcSubjectItemRepository extends DataProviderRepository<LcSubjectItem> {
    /**
     * 根据主题id删除
     *
     * @param subjectId
     */
    void deleteAllBySubjectId(Long subjectId);
}
