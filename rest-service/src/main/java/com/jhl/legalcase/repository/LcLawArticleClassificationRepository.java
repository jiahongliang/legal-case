package com.jhl.legalcase.repository;

import com.jhl.legalcase.dataInterface.repository.DataProviderRepository;
import com.jhl.legalcase.entity.LcLawArticleClassification;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface LcLawArticleClassificationRepository extends DataProviderRepository<LcLawArticleClassification> {
    List<LcLawArticleClassification> findAllByName(String name);

    @Modifying
    @Transactional
    void deleteAllByName(String name);

    List<LcLawArticleClassification> findTop1000ByLastmodifiedTimeAfterOrderByLastmodifiedTimeAsc(Date lastmodifiedTime);
}
