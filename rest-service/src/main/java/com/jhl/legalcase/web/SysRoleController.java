package com.jhl.legalcase.web;

import com.jhl.legalcase.entity.SysRole;
import com.jhl.legalcase.repository.SysRoleRepository;
import com.jhl.legalcase.util.webmsg.WebResp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "role")
public class SysRoleController {

    @Autowired
    private SysRoleRepository sysRoleRepository;

    @GetMapping("/list")
    public WebResp<SysRole, Long> list() {
        List<SysRole> roleList = sysRoleRepository.findAll();
        return WebResp.newInstance().pages(0).total(roleList.size()).rows(roleList);
    }
}
