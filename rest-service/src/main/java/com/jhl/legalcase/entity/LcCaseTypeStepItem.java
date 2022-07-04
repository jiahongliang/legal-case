package com.jhl.legalcase.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

/**
 * @author
 */
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "lc_case_type_step_item")
@Data
public class LcCaseTypeStepItem extends JpaAudit {
    private String name;
    private String lawTitle;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "step_id")
    private LcCaseTypeStep caseTypeStep;
}
