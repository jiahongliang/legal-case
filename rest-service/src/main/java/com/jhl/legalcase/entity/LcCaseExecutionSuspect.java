package com.jhl.legalcase.entity;

import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;

@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "lc_case_execution_suspect")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LcCaseExecutionSuspect extends JpaAudit {
    private Long executionId;
    private String name;
}
