package com.jhl.legalcase.web.vo;

import com.jhl.legalcase.entity.LcCaseExecutionComment;
import lombok.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static com.jhl.legalcase.LegalCaseConstants.CASE_EXECUTION_CREATED;

@Data
@EqualsAndHashCode(callSuper = false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LcCaseExecutionVo extends BaseVo {
    private Long typeId;
    private String typeName;
    private String name;
    private String creator;
    private List<LcCaseExecutionStepVo> steps;
    private List<LcCaseExecutionComment> comments;
    private Integer status = CASE_EXECUTION_CREATED;
    private String creatorDept;
    private String creatorDeptSearch;
    private Long ownedBy;
    private String owner;
    private String ownerDept;
    private String ownerDeptSearch;

    public static Map<String, String> excelHeaders() {
        Map<String, String> map = new LinkedHashMap<>();
        map.put("name", "名称");
        map.put("typeName", "类型");
        map.put("creator", "负责人");
        map.put("steps", "环节");
        map.put("items", "事项");
        map.put("createdTime", "创建时间");
        map.put("status", "状态");
        return map;
    }

    public Map<String, Object> excelRecord() {
        int totalItems = 0;
        int restItems = 0;
        for (LcCaseExecutionStepVo step : steps) {
            totalItems += step.getCaseTypeStepItems() == null ? 0 : step.getCaseTypeStepItems().size();
            restItems += step.getCaseTypeStepItems() == null ? 0 : step.getCaseTypeStepItems().stream().filter(item -> item.getStatus() != null && item.getStatus().equals(1)).count();
        }
        return Map.of(
                "name", this.name == null ? "" : this.name,
                "typeName", this.typeName == null ? "" : this.typeName,
                "creator", this.creator == null ? "" : this.creator,
                "steps", steps == null ? "0/0" : (steps.stream().filter(step ->
                        step.getCaseTypeStepItems() == null ? false : step.getCaseTypeStepItems().stream().filter(item -> item.getStatus() != null && item.getStatus().equals(1)).toList().size() > 0
                ).toList().size() + "/" + steps.size()),
                "items", restItems + "/" + totalItems,
                "createdTime", this.getCreatedTime() == null ? "" : this.getCreatedTime(),
                "status", this.status == null ? "" : (this.status.equals(1) ? "进行中" : (this.status.equals(2) ? "已完成" : ""))
        );
    }
}
