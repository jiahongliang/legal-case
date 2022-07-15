package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.LcSubject;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

/**
 * @author
 */
public interface LcSubjectRepository extends JpaRepositoryImplementation<LcSubject, Long> {
    /**
     * 查找所有顶层目录
     *
     * @return
     */
    List<LcSubject> findAllByParentIsNull();
}
