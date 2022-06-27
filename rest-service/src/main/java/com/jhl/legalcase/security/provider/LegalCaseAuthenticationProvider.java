package com.jhl.legalcase.security.provider;

import com.jhl.legalcase.LegalCaseConstants;
import com.jhl.legalcase.entity.SysUser;
import com.jhl.legalcase.service.SysUserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * @author
 */
@Component
public class LegalCaseAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    private SysUserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws DisabledException, LockedException, BadCredentialsException {
        String username = (String) authentication.getPrincipal();
        String password = (String) authentication.getCredentials();
        SysUser user = userService.findByMobile(username);

        if (LegalCaseConstants.USER_STATUS_INITIATED.equals(user.getStatus())) {
            throw new DisabledException("用户未确认");
        }

        if (LegalCaseConstants.USER_STATUS_LOCKED.equals(user.getStatus())) {
            throw new LockedException("用户被禁用");
        }

        boolean isValid = passwordEncoder.matches(password, user.getPassword());
        if (!isValid) {
            throw new BadCredentialsException("密码不正确！");
        }

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (String s : StringUtils.commaDelimitedListToStringArray(user.getRole())) {
            authorities.add(new SimpleGrantedAuthority(s));
        }

        AbstractAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, "[protected]", authorities);
        SysUser detailEntity = new SysUser();
        BeanUtils.copyProperties(user, detailEntity, "password", "status", "createdBy", "createdTime", "lastmodifiedBy", "lastmodifiedTime");
        token.setDetails(detailEntity);
        return token;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }
}
