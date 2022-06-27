package com.jhl.legalcase.web.vo;

import lombok.*;

import static com.jhl.legalcase.LegalCaseConstants.CASE_EXECUTION_STEP_ITEM_CREATED;

@Data
@EqualsAndHashCode(callSuper = false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LcCaseExecutionStepItemVo extends BaseVo {
    private Long executionId;
    private Long stepId;
    private Long suspectId;
    private String itemName;
    private Integer status = CASE_EXECUTION_STEP_ITEM_CREATED;
}
