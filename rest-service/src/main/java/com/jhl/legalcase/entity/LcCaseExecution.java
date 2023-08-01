package com.jhl.legalcase.entity;

import com.jhl.legalcase.entity.entityListener.ExecutionEntityListener;
import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;

@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "lc_case_execution")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(ExecutionEntityListener.class)
public class LcCaseExecution extends JpaAudit {
    private Long typeId;
    private String name;
    private String nameSearch;
    private Integer status;
    private String creator;
    private String creatorDept;
    private String creatorDeptSearch;
    private Long ownedBy;
    private String owner;
    private String ownerDept;
    private String ownerDeptSearch;
}
