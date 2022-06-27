package com.jhl.legalcase.exception;

/**
 * 手机号码不合法
 *
 * @author
 */
public class MobileNotValidException extends RuntimeException {
    public MobileNotValidException(String msg) {
        super(msg);
    }
}
