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
@Table(name = "lc_case_type_step")
@Data
public class LcCaseTypeStep extends JpaAudit {
    private String code;
    private String name;
    private Integer orderValue;
    private String items;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "type_id")
    private LcCaseType caseType;
}
