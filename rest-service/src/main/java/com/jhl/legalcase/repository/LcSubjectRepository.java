package com.jhl.legalcase.repository;

import com.jhl.legalcase.dataInterface.repository.DataProviderRepository;
import com.jhl.legalcase.entity.LcSubject;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author
 */
public interface LcSubjectRepository extends DataProviderRepository<LcSubject> {
    /**
     * 查找所有顶层目录
     *
     * @return
     */
    List<LcSubject> findAllByParentIsNullOrderByOrderValue();

    /**
     * 查找符合条件记录
     *
     * @return
     */
    List<LcSubject> findAllByNameSearchIsNull();

    @Modifying
    @Transactional
    @Query(value = "update lc_subject set order_value = 100 where order_value is null", nativeQuery = true)
    void initializeOrderValue();
}
