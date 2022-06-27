package com.jhl.legalcase.service;

import com.jhl.legalcase.LegalCaseConstants;
import com.jhl.legalcase.entity.SysUser;
import com.jhl.legalcase.repository.SysUserRepository;
import com.jhl.legalcase.security.util.LegalCaseSecurityUser;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

import static com.jhl.legalcase.LegalCaseConstants.USER_STATUS_INITIATED;

/**
 * 用户服务类
 *
 * @author
 */
@Service("userService")
@Transactional(rollbackFor = Exception.class)
public class SysUserService implements UserDetailsService {
    @Autowired
    private SysUserRepository userRepository;

    @Value("${legalCase.security.user.defaultPassword:123456}")
    private String defaultPassword;

    @Value("${legalCase.security.user.defaultRole:USER}")
    private String defaultRole;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Locates the user based on the username. In the actual implementation, the search
     * may possibly be case sensitive, or case insensitive depending on how the
     * implementation instance is configured. In this case, the <code>UserDetails</code>
     * object that comes back may have a username that is of a different case than what
     * was actually requested..
     *
     * @param username the username identifying the user whose data is required.
     * @return a fully populated user record (never <code>null</code>)
     * @throws UsernameNotFoundException if the user could not be found or the user has no
     *                                   GrantedAuthority
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SysUser user = userRepository.findFirstByMobile(username);
        if (user != null) {
            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
            for (String s : StringUtils.commaDelimitedListToStringArray(user.getRole())) {
                authorities.add(new SimpleGrantedAuthority(s));
            }
            boolean enabled = (user.getStatus() != null && !user.getStatus().equals(USER_STATUS_INITIATED));
            boolean accountNonLocked = (user.getStatus() != null && !user.getStatus().equals(LegalCaseConstants.USER_STATUS_LOCKED));
            LegalCaseSecurityUser result = (LegalCaseSecurityUser) new User(user.getName(), user.getPassword(), enabled, true, true, accountNonLocked, authorities);

            SysUser entity = new SysUser();
            BeanUtils.copyProperties(user, entity);
            entity.setPassword("");
            result.setEntity(entity);

            return result;
        }
        throw new UsernameNotFoundException("未找到对应的用户");
    }

    public SysUser findByMobile(String mobile) {
        return userRepository.findFirstByMobile(mobile);
    }

    public void resetPasswordById(Long id) {
        SysUser user = userRepository.getReferenceById(id);
        if (user != null) {
            user.setPassword(passwordEncoder.encode(defaultPassword));
            userRepository.save(user);
        }
    }

    public void resetPassword(List<Long> ids) {
        ids.forEach(id -> {
            resetPasswordById(id);
        });
    }

    public SysUser register(SysUser user) {
        user.setId(null);
        user.setStatus(USER_STATUS_INITIATED);
        user.setPassword(passwordEncoder.encode(defaultPassword));
        user.setRole(defaultRole);
        return userRepository.save(user);
    }
}
