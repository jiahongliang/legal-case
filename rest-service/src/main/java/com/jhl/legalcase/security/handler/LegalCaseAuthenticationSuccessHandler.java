package com.jhl.legalcase.security.handler;

import com.alibaba.fastjson.JSON;
import com.jhl.legalcase.LegalCaseConstants;
import com.jhl.legalcase.entity.SysUser;
import com.jhl.legalcase.util.webmsg.WebResp;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author
 */
@Component
public class LegalCaseAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    /**
     * Called when a user has been successfully authenticated.
     *
     * @param request        the request which caused the successful authentication
     * @param response       the response
     * @param authentication the <tt>Authentication</tt> object which was created during
     */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        WebResp<SysUser, Object> resp = new WebResp<>();
        List<SysUser> rows = new ArrayList<>();
        rows.add((SysUser) authentication.getDetails());
        resp.setRows(rows);
        response.getWriter().write(JSON.toJSONString(resp));
        request.getSession().removeAttribute(LegalCaseConstants.GENERATED_VERIFY_CODE);
    }
}
