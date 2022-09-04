package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.LcLawArticle;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

/**
 * @author
 */
public interface LcLawArticleRepository extends JpaRepositoryImplementation<LcLawArticle, Long> {
    /**
     * 查找符合条件记录
     *
     * @return
     */
    List<LcLawArticle> findAllByTitleSearchIsNull();
}
