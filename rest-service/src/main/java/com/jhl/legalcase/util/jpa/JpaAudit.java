package com.jhl.legalcase.util.jpa;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

/**
 * 实体信息基础类
 *
 * @author
 */
@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class JpaAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GenericGenerator(name = "increment", strategy = "increment")
    private Long id;

    @Column(name = "created_by", updatable = false)
    @CreatedBy
    private Long createdBy;

    @Column(name = "created_time", updatable = false)
    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createdTime;

    @Column(name = "lastmodified_by")
    @LastModifiedBy
    private Long lastmodifiedBy;

    @Column(name = "lastmodified_time")
    @LastModifiedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date lastmodifiedTime;

}
