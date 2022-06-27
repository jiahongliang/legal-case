package com.jhl.legalcase.security.handler;

import com.alibaba.fastjson.JSON;
import com.jhl.legalcase.LegalCaseConstants;
import com.jhl.legalcase.security.config.exception.VerifyCodeErrorAuthenticationException;
import com.jhl.legalcase.util.webmsg.WebResp;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author
 */
@Component
public class LegalCaseAuthenticationFailureHandler implements AuthenticationFailureHandler {
    /**
     * Called when an authentication attempt fails.
     *
     * @param request   the request during which the authentication attempt occurred.
     * @param response  the response.
     * @param exception the exception which was thrown to reject the authentication
     */
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        WebResp<AuthenticationException, Object> resp = new WebResp<>();
        if (exception instanceof VerifyCodeErrorAuthenticationException) {
            resp.setSubCode(10002);
            resp.setSubMsg(exception.getMessage());
        } else {
            resp.setSubCode(10001);
            resp.setSubMsg("用户名或密码不正确");
        }
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(JSON.toJSONString(resp));
        request.getSession().removeAttribute(LegalCaseConstants.GENERATED_VERIFY_CODE);
    }
}
