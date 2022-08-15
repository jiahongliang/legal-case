package com.jhl.legalcase.security.filter;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jhl.legalcase.LegalCaseConstants;
import com.jhl.legalcase.security.config.exception.VerifyCodeErrorAuthenticationException;
import com.jhl.legalcase.security.handler.LegalCaseAuthenticationFailureHandler;
import com.jhl.legalcase.security.handler.LegalCaseAuthenticationSuccessHandler;
import com.jhl.legalcase.security.manager.LegalCaseAuthenticationManager;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Base64;

@Component
public class LegalCaseAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    public static final String SPRING_SECURITY_FORM_VERIFY_CODE_KEY = "verifyCode";

    private String verifyCodeParameter = SPRING_SECURITY_FORM_VERIFY_CODE_KEY;

    @Value("${legalCase.security.login.validateCode:false}")
    private Boolean validateCodeRequired;

    public LegalCaseAuthenticationFilter(LegalCaseAuthenticationManager authenticationManager, LegalCaseAuthenticationSuccessHandler authenticationSuccessHandler, LegalCaseAuthenticationFailureHandler authenticationFailureHandler) {
        this.setAuthenticationManager(authenticationManager);
        this.setAuthenticationSuccessHandler(authenticationSuccessHandler);
        this.setAuthenticationFailureHandler(authenticationFailureHandler);
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        String loginToken = request.getParameter("loginToken");
        String str = new String(Base64.getDecoder().decode(loginToken), "utf-8");
        JSONObject obj = JSON.parseObject(str);

        if(validateCodeRequired) {
            String verifyCode = obj.getString(verifyCodeParameter);
            String sessionVerifyCode = (String) request.getSession().getAttribute(LegalCaseConstants.GENERATED_VERIFY_CODE);
            if (verifyCode == null || sessionVerifyCode == null || !verifyCode.equals(sessionVerifyCode)) {
                throw new VerifyCodeErrorAuthenticationException();
            }
        }

        String username = obj.getString("userName");
        String password = obj.getString("password");
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
        return this.getAuthenticationManager().authenticate(token);
    }
}
