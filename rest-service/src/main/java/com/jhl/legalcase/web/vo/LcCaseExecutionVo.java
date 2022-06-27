package com.jhl.legalcase.web.vo;

import lombok.*;

import java.util.List;

import static com.jhl.legalcase.LegalCaseConstants.CASE_EXECUTION_CREATED;

@Data
@EqualsAndHashCode(callSuper = false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LcCaseExecutionVo extends BaseVo {
    private Long typeId;
    private String name;
    private List<LcCaseExecutionSuspectVo> suspects;
    private List<LcCaseExecutionStepVo> steps;
    private Integer status = CASE_EXECUTION_CREATED;
}
