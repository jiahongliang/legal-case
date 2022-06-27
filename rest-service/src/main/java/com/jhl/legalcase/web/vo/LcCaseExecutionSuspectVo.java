package com.jhl.legalcase.web.vo;

import lombok.*;

import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LcCaseExecutionSuspectVo extends BaseVo{
    private Long executionId;
    private String name;
}
