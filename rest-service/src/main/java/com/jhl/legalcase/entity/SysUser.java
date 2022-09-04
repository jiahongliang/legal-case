package com.jhl.legalcase.entity;

import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 用户对象
 *
 * @author
 */
@Entity
@Table(name = "sys_user")
@Data
public class SysUser extends JpaAudit {

    private String name;
    private String nameSearch;
    private String gender;
    private String deptName;
    private String deptNameSearch;
    private String mobile;
    private String password;
    private String role;
    private String memo;
    private Integer status;
}
