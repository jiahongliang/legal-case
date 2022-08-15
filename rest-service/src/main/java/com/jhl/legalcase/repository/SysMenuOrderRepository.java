package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.SysMenuOrder;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

public interface SysMenuOrderRepository extends JpaRepositoryImplementation<SysMenuOrder, Long> {
    /**
     * 根据用户id获取数据
     *
     * @param userId
     * @return
     */
    List<SysMenuOrder> findByUserId(Long userId);

    /**
     * 根据用户id删除数据
     *
     * @param userId
     */
    void deleteAllByUserId(Long userId);
}
