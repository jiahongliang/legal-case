package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.LcLawArticle;
import com.jhl.legalcase.entity.LcSubject;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

/**
 * @author
 */
public interface LcLawArticleRepository extends JpaRepositoryImplementation<LcLawArticle, Long> {
}
