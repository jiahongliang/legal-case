package com.jhl.legalcase.repository;

import com.jhl.legalcase.dataInterface.repository.DataProviderRepository;
import com.jhl.legalcase.entity.LcLawArticle;

import java.util.List;

/**
 * @author
 */
public interface LcLawArticleRepository extends DataProviderRepository<LcLawArticle> {
    /**
     * 查找符合条件记录
     *
     * @return
     */
    List<LcLawArticle> findAllByTitleSearchIsNull();

    LcLawArticle findFirstByIdIsNotNullOrderByCreatedTimeDesc();

}
