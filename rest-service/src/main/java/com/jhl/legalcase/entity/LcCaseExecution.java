package com.jhl.legalcase.entity;

import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;

import static com.jhl.legalcase.LegalCaseConstants.CASE_EXECUTION_CREATED;

@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "lc_case_execution")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LcCaseExecution extends JpaAudit {
    private Long typeId;
    private String name;
    private String suspects;
    private Integer status;
}
