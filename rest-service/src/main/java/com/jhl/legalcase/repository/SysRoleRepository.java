package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.SysRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

public interface SysRoleRepository extends JpaRepositoryImplementation<SysRole, Long> {
}
