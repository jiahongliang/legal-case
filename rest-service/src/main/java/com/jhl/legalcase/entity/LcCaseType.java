package com.jhl.legalcase.entity;

import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 案件类型
 *
 * @author
 */
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "lc_case_type")
@Data
public class LcCaseType extends JpaAudit {

    private String code;
    private String name;
    private String nameSearch;
    private String memo;

    @OneToMany(cascade = CascadeType.ALL,
            mappedBy = "caseType")
    @OrderBy("orderValue asc")
    private List<LcCaseTypeStep> caseTypeSteps = new ArrayList<>();
}
