package com.jhl.legalcase.entity;

import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author
 */
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "lc_service_reminder")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class LcServiceReminder extends JpaAudit {
    private String fileName;
    private Long attachmentId;
    private Integer orderValue;
}
