package com.jhl.legalcase.security.config;

import com.jhl.legalcase.entity.SysUser;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class LegalCaseAuditorAware implements AuditorAware<Long> {
    /**
     * Returns the current auditor of the application.
     *
     * @return the current auditor.
     */
    @Override
    public Optional<Long> getCurrentAuditor() {
        AbstractAuthenticationToken token = (AbstractAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        SysUser user = null;
        try {
            user = (SysUser) token.getDetails();
        } catch (Exception e) {}
        if (user != null && user.getId() != null) {
            return Optional.of(user.getId());
        }

        return Optional.of(1L);
    }
}
