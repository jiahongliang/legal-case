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
import java.util.LinkedHashMap;
import java.util.Map;

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

    private String nameSearch;

    private String ip;

    private String systemName;

    private String browser;

    private String deviceType;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date endTime;

    public static Map<String, String> excelHeaders() {
        Map<String, String> map = new LinkedHashMap<>();
        map.put("name", "登录人");
        map.put("ip", "IP地址");
        map.put("deviceType", "设备类型");
        map.put("browser", "浏览器");
        map.put("system", "操作系统");
        map.put("createdTime", "登录时间");
        map.put("endTime", "退出时间");
        return map;
    }
}
