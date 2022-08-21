package com.jhl.legalcase.web;

import com.jhl.legalcase.entity.SysLoginLog;
import com.jhl.legalcase.repository.SysLoginLogRepository;
import com.jhl.legalcase.util.webmsg.WebReq;
import com.jhl.legalcase.util.webmsg.WebResp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "login-log")
public class SysLoginLogController {
    @Autowired
    SysLoginLogRepository loginLogRepository;

    @PostMapping("/list")
    public WebResp<SysLoginLog, Long> list(@RequestBody WebReq<SysLoginLog, Long> req) throws ClassNotFoundException {
        Page<SysLoginLog> result = loginLogRepository.findAll(req.specification(), req.pageable());
        return WebResp.newInstance().rows(result.getContent()).pages(result.getTotalPages()).total(result.getTotalElements());
    }
}
