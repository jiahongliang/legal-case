package com.jhl.legalcase.service;

import com.jhl.legalcase.entity.SysLoginLog;
import com.jhl.legalcase.entity.SysUser;
import com.jhl.legalcase.repository.SysLoginLogRepository;
import com.jhl.legalcase.util.pinyin.PinyinUtil;
import eu.bitwalker.useragentutils.UserAgent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;

@Slf4j
@Service
@Transactional(rollbackFor = Exception.class)
public class SysLoginLogService {

    @Autowired
    SysLoginLogRepository loginLogRepository;

    @Autowired
    HttpServletRequest request;

    @Transactional(rollbackFor = Exception.class)
    public void logUserLogin(HttpSession session) {
        AbstractAuthenticationToken token = (AbstractAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        final SysUser user = (SysUser) token.getDetails();
        final String sessionId = session.getId();
        final String ip = request.getHeader("x-real-ip");
        String userAgent = request.getHeader("user-agent");
        UserAgent ua = UserAgent.parseUserAgentString(userAgent);
        String browser = ua.getBrowser().getName() + "-" + ua.getBrowserVersion();
        String systemName = ua.getOperatingSystem().toString();
        String deviceType = ua.getOperatingSystem().getDeviceType().getName();
        String nameSearch = "";
        if (user != null && user.getName() != null) {
            nameSearch = user.getName() + "|" + PinyinUtil.toFirstChar(user.getName());
        }

        SysLoginLog entity = SysLoginLog.builder().sessionId(sessionId).userId(user.getId()).name(user.getName()).nameSearch(nameSearch).ip(ip).browser(browser).systemName(systemName).deviceType(deviceType).build();
        loginLogRepository.save(entity);
    }

    @Transactional(rollbackFor = Exception.class)
    public void endUserLogin(String sessionId) {
        SysLoginLog log = loginLogRepository.findFirstBySessionId(sessionId);
        if (log != null) {
            log.setEndTime(new Date());
            loginLogRepository.save(log);
        }
    }
}
