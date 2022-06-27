package com.jhl.legalcase.util.webmsg;

import lombok.Data;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

/**
 * 返回消息对象
 *
 * @param <T>
 * @param <T2>
 * @author
 */
@Data
public class WebResp<T, T2> {
    /**
     * 状态描述 10000 调用成功 10001 接口调用失败 10002 权限不足 10003 缺少必选参数 10004 参数格式不对
     */
    private int code = 10000;

    private String msg = "调用成功";

    /**
     * 状态描述 二级  0 调用成功 -1 系统繁忙,请稍后再试 10001 输入参数错误 10002 验证码错误 10004 其他错误 20001 Redis访问失败  30001 主键重复
     */
    private int subCode = 0;

    private String subMsg = "操作成功";
    /**
     * 错误类型 0 api错误 1 通道错误
     */
    private int errType = 0;

    /**
     * 时间戳
     */
    private long ts = System.currentTimeMillis();

    /**
     * 记录集合
     */
    private List<T> rows = new ArrayList<T>();

    /**
     * 记录总数
     */
    private long total;

    /**
     * 总页数
     */
    private int pages;

    /**
     * 扩展信息
     */
    private T2 ext;

    public static WebResp newInstance() {
        return new WebResp();
    }

    public WebResp code(int code) {
        this.code = code;
        return this;
    }

    public WebResp msg(String msg) {
        this.msg = msg;
        return this;
    }

    public WebResp subCode(int subCode) {
        this.subCode = subCode;
        return this;
    }

    public WebResp subMsg(String subMsg) {
        this.subMsg = subMsg;
        return this;
    }

    public WebResp errType(int errType) {
        this.errType = errType;
        return this;
    }

    public WebResp rows(List<T> rows) {
        this.rows = rows;
        return this;
    }

    public WebResp total(long total) {
        this.total = total;
        return this;
    }

    public WebResp pages(int pages) {
        this.pages = pages;
        return this;
    }

    public WebResp ext(T2 ext) {
        this.ext = ext;
        return this;
    }

    public void addRow(T... arr) {
        for (T t : arr) {
            rows.add(t);
        }
    }
}
