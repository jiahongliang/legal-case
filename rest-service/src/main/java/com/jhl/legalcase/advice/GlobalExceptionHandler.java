package com.jhl.legalcase.advice;

import com.jhl.legalcase.util.webmsg.WebResp;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Component
public class GlobalExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    public WebResp exceptionHandle(Exception exception) {
        exception.printStackTrace();
        return WebResp.newInstance()
                .code(10000)
                .subCode(10004)
                .subMsg(exception.getMessage());
    }
}
