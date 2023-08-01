package com.jhl.legalcase.web.vo;

import lombok.Data;

@Data
public class UserVo {
    private Long id;
    private String name;
    private String nameSearch;
    private String gender;
    private String deptName;
    private String deptNameSearch;
    private String mobile;
}
