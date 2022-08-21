package com.jhl.legalcase.entity;

import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 附件管理
 *
 * @author
 */
@Entity
@Table(name = "sys_attachment")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class SysAttachment extends JpaAudit {

    //原文件名
    private String name;

    //存储文件名
    private String path;

    //文件类型
    private String contentType;

    //文件大小
    private Long fileSize;

}
