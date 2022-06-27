package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.LcCaseType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

public interface LcCaseTypeRepository extends JpaRepositoryImplementation<LcCaseType, Long> {
}
