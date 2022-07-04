package com.jhl.legalcase.entity;

import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;

import static com.jhl.legalcase.LegalCaseConstants.CASE_EXECUTION_STEP_ITEM_CREATED;

@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "lc_case_execution_step_item")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LcCaseExecutionStepItem extends JpaAudit {
    private Long executionId;
    private Long stepId;
    private String name;
    private String lawTitle;
    private Integer status = CASE_EXECUTION_STEP_ITEM_CREATED;
}
