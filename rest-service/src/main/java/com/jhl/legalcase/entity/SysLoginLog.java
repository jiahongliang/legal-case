package com.jhl.legalcase.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * 登录日志
 *
 * @author
 */
@Entity
@Table(name = "sys_login_log")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class SysLoginLog extends JpaAudit {

    private String sessionId;

    private Long userId;

    private String name;

    private String ip;

    private String system;

    private String browser;

    private String deviceType;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date endTime;

}
