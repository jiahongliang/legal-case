package com.jhl.legalcase.listener;

import com.jhl.legalcase.entity.LcCaseExecution;
import com.jhl.legalcase.entity.SysUser;
import com.jhl.legalcase.repository.LcCaseExecutionRepository;
import com.jhl.legalcase.repository.SysUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Slf4j
public class CaseExecutionOwnerHandler implements CommandLineRunner {
    @Autowired
    private LcCaseExecutionRepository caseExecutionRepository;

    @Autowired
    private SysUserRepository sysUserRepository;

    @Override
    public void run(String... args) throws Exception {
        List<SysUser> users = sysUserRepository.findAll();
        Map<Long, SysUser> userMap = new HashMap<>();
        for (SysUser user : users) {
            userMap.put(user.getId(), user);
        }

        List<LcCaseExecution> executions = caseExecutionRepository.findAllByOwnedByIsNull();
        executions.forEach(item -> {
            if (item.getCreatedBy() != null) {
                SysUser sysUser = userMap.get(item.getCreatedBy());
                if (sysUser != null) {
                    item.setCreator(sysUser.getName());
                    item.setCreatorDept(sysUser.getDeptName());
                    item.setCreatorDeptSearch(sysUser.getDeptNameSearch());
                    item.setOwnedBy(item.getOwnedBy());
                    item.setOwner(sysUser.getName());
                    item.setOwnerDept(sysUser.getDeptName());
                    item.setOwnerDeptSearch(sysUser.getDeptNameSearch());
                }
            }
        });
        caseExecutionRepository.saveAll(executions);
    }
}
