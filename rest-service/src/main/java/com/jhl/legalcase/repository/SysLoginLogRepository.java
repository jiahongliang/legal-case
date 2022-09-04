package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.SysLoginLog;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

public interface SysLoginLogRepository extends JpaRepositoryImplementation<SysLoginLog, Long> {
    /**
     * 根据sessionId获取用户登录日志
     *
     * @param sessionId
     * @return
     */
    SysLoginLog findFirstBySessionId(String sessionId);

    /**
     * 根据姓名查询记录
     *
     * @param name
     * @return
     */
    List<SysLoginLog> findAllByNameLike(String name);

    /**
     * 查询符合条件记录
     *
     * @return
     */
    List<SysLoginLog> findAllByNameSearchIsNull();
}
