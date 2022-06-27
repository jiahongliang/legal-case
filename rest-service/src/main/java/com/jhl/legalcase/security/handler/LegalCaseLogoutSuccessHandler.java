package com.jhl.legalcase.security.handler;

import com.alibaba.fastjson.JSON;
import com.jhl.legalcase.util.webmsg.WebResp;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author
 */
@Component
public class LegalCaseLogoutSuccessHandler implements LogoutSuccessHandler {

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        WebResp resp = WebResp.newInstance();
        response.getWriter().write(JSON.toJSONString(resp));
    }
}
