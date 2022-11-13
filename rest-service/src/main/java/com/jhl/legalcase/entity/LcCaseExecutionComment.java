package com.jhl.legalcase.entity;

import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.Table;

import static com.jhl.legalcase.LegalCaseConstants.CASE_EXECUTION_COMMENT_CREATED;

@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "lc_case_execution_comment")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class LcCaseExecutionComment extends JpaAudit {
    private Long executionId;
    private String name;
    private Integer status = CASE_EXECUTION_COMMENT_CREATED;
}
