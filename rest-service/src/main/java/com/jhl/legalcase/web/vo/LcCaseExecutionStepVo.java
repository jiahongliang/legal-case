package com.jhl.legalcase.web.vo;

import lombok.*;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LcCaseExecutionStepVo extends BaseVo{
    private Long executionId;
    private String name;
    private String suspect;
    private List<LcCaseExecutionStepItemVo> caseTypeStepItems;
}
