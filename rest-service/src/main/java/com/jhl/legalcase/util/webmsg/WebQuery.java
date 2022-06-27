package com.jhl.legalcase.util.webmsg;

import lombok.Data;

import java.io.Serializable;

/**
 * 自定义查询对象
 *
 * @author
 */
@Data
public class WebQuery implements Serializable {

    private static final long serialVersionUID = 1L;

    private String field;

    private String value;

    private String opt;

    private String assemble;

    public WebQuery() {
    }

    public WebQuery(String field, String value) {
        this.field = field;
        this.value = value;
        this.opt = "=";
        this.assemble = "and";
    }

    public WebQuery(String field, String value, String opt, String assemble) {
        this.field = field;
        this.value = value;
        this.opt = opt;
        this.assemble = assemble;
    }
}
