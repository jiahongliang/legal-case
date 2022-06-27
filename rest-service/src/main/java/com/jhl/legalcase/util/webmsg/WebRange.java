package com.jhl.legalcase.util.webmsg;


import lombok.Data;

import java.io.Serializable;

/**
 * 请求区间对象
 *
 * @author
 */
@Data
public class WebRange implements Serializable {

    private static final long serialVersionUID = 2L;

    private String field;

    private String from;

    private String to;

    private Boolean includeNull;

    public WebRange() {
    }

    public WebRange(String field) {
        this.field = field;
    }

    public WebRange(String field, String from, String to) {
        this.field = field;
        this.from = from;
        this.to = to;
    }

    public WebRange(String field, String from, String to, Boolean includeNull) {
        this.field = field;
        this.from = from;
        this.to = to;
        this.includeNull = includeNull;
    }

    public WebRange(WebRange myRange) {
        this.field = myRange.getField();
        this.from = myRange.getFrom();
        this.to = myRange.getTo();
        this.includeNull = myRange.getIncludeNull();
    }

    public boolean isFromSet() {
        return getFrom() != null;
    }

    public boolean isToSet() {
        return getTo() != null;
    }

    public boolean isIncludeNullSet() {
        return includeNull != null;
    }

    public boolean isBetween() {
        return isFromSet() && isToSet();
    }

    public boolean isSet() {
        return isFromSet() || isToSet() || isIncludeNullSet();
    }

    public boolean isRangeSet() {
        return isFromSet() || isToSet() || isIncludeNullSet();
    }

    public boolean isValid() {
        if (isBetween()) {
            return getFrom().compareTo(getTo()) <= 0;
        }
        return true;
    }
}