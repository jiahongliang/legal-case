package com.jhl.legalcase.security.config.exception;

import org.springframework.security.core.AuthenticationException;

public class VerifyCodeErrorAuthenticationException extends AuthenticationException {

    private static String defaultMsg = "验证码错误";

    public VerifyCodeErrorAuthenticationException() {
        super(defaultMsg);
    }

    /**
     * Constructs an {@code AuthenticationException} with the specified message and root
     * cause.
     *
     * @param msg   the detail message
     * @param cause the root cause
     */
    public VerifyCodeErrorAuthenticationException(String msg, Throwable cause) {
        super(msg, cause);
    }

    /**
     * Constructs an {@code AuthenticationException} with the specified message and no
     * root cause.
     *
     * @param msg the detail message
     */
    public VerifyCodeErrorAuthenticationException(String msg) {
        super(msg);
    }
}
