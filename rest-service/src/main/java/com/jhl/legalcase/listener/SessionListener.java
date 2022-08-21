package com.jhl.legalcase.listener;

import com.jhl.legalcase.service.SysLoginLogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

@Slf4j
@WebListener
@Configuration
public class SessionListener implements HttpSessionListener {

    @Autowired
    SysLoginLogService loginLogService;

    @Override
    public void sessionCreated(HttpSessionEvent se) {
        loginLogService.logUserLogin(se.getSession());
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        loginLogService.endUserLogin(se.getSession().getId());
    }
}
