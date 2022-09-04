package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.LcCaseType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

public interface LcCaseTypeRepository extends JpaRepositoryImplementation<LcCaseType, Long> {
    /**
     * 查找符合条件记录
     *
     * @return
     */
    List<LcCaseType> findAllByNameSearchIsNull();
}
