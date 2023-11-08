package com.jhl.legalcase.entity.entityListener;

import com.jhl.legalcase.LegalCaseApplication;
import com.jhl.legalcase.entity.LcCaseExecution;
import com.jhl.legalcase.entity.SysUser;
import com.jhl.legalcase.repository.SysUserRepository;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.Optional;

@Slf4j
public class ExecutionEntityListener {

    public ExecutionEntityListener() {
        log.info("ExecutionEntityListener created.");
    }

    @PrePersist
    public void prePersist(LcCaseExecution execution) {
        this.setCreatorData(execution);
        //this.setOwnerData(execution);
    }

    @PreUpdate
    public void preUpdate(LcCaseExecution execution) {
        //this.setOwnerData(execution);
    }

    private void setCreatorData(LcCaseExecution execution) {
        SysUserRepository sysUserRepository = (SysUserRepository) LegalCaseApplication.applicationContext.getBean("sysUserRepository");
        if (execution.getCreatedBy() != null) {
            Optional<SysUser> userOptional = sysUserRepository.findById(execution.getCreatedBy());
            if (userOptional.isPresent()) {
                SysUser sysUser = userOptional.get();
                execution.setCreator(sysUser.getName());
                execution.setCreatorDept(sysUser.getDeptName());
                execution.setCreatorDeptSearch(sysUser.getDeptNameSearch());
            }
        }
    }

    private void setOwnerData(LcCaseExecution execution) {
        SysUserRepository sysUserRepository = (SysUserRepository) LegalCaseApplication.applicationContext.getBean("sysUserRepository");
        if (execution.getOwnedBy() != null) {
            Optional<SysUser> userOptional = sysUserRepository.findById(execution.getOwnedBy());
            if (userOptional.isPresent()) {
                SysUser sysUser = userOptional.get();
                execution.setOwner(sysUser.getName());
                execution.setOwnerDept(sysUser.getDeptName());
                execution.setOwnerDeptSearch(sysUser.getDeptNameSearch());
            }
        }
    }
}
