package com.jhl.legalcase.dataInterface.repository;

import com.jhl.legalcase.util.jpa.JpaAudit;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Date;
import java.util.List;

@NoRepositoryBean
public interface DataProviderRepository<E extends JpaAudit> extends JpaRepositoryImplementation<E, Long> {
    List<E> findTop1000ByLastmodifiedTimeAfterOrderByCreatedTimeAsc(Date createdTime);

    E findFirstByIdIsNotNullOrderByCreatedTimeDesc();
}
