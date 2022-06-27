package com.jhl.legalcase.entity;

import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 角色对象
 *
 * @author
 */
@Entity
@Table(name = "sys_role")
@Data
public class SysRole extends JpaAudit {

    private String code;
    private String name;
    private String memo;
}
