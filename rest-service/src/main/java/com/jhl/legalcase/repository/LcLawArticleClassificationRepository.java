package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.LcLawArticleClassification;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

public interface LcLawArticleClassificationRepository extends JpaRepositoryImplementation<LcLawArticleClassification, Long> {
    List<LcLawArticleClassification> findAllByName(String name);
}
