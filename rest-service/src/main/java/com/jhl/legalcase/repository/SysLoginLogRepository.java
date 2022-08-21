package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.SysLoginLog;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

public interface SysLoginLogRepository extends JpaRepositoryImplementation<SysLoginLog, Long> {
    /**
     * 根据sessionId获取用户登录日志
     *
     * @param sessionId
     * @return
     */
    SysLoginLog findFirstBySessionId(String sessionId);
}
