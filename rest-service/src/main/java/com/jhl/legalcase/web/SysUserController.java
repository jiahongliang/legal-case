package com.jhl.legalcase.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jhl.legalcase.entity.SysUser;
import com.jhl.legalcase.exception.MobileNotValidException;
import com.jhl.legalcase.repository.SysUserRepository;
import com.jhl.legalcase.service.SysUserService;
import com.jhl.legalcase.util.common.MyBeanUtils;
import com.jhl.legalcase.util.webmsg.WebReq;
import com.jhl.legalcase.util.webmsg.WebResp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.List;

import static com.jhl.legalcase.LegalCaseConstants.*;

@Slf4j
@RestController
@RequestMapping(value = "user")
public class SysUserController {

    @Autowired
    private SysUserRepository sysUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SysUserService userService;

    @PostMapping("/list")
    public WebResp<SysUser, Long> userList(@RequestBody WebReq<SysUser, Long> req) throws ClassNotFoundException {
        Page<SysUser> result = sysUserRepository.findAll(req.specification(), req.pageable());
        result.getContent().forEach(o -> {
            o.setPassword(null);
        });
        try {
            req.specification();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return WebResp.newInstance().rows(result.getContent()).pages(result.getTotalPages()).total(result.getTotalElements());
    }

    @PostMapping("/action")
    public WebResp<SysUser, Long> actionUser(@RequestBody WebReq<SysUser, String> req) {
        Assert.notNull(req.getEntity(), "entity??????????????????");
        Assert.notNull(req.getEntity().getId(), "entity.id??????????????????");
        Assert.notNull(req.getExt(), "ext-????????????????????????");

        SysUser user = sysUserRepository.getReferenceById(req.getEntity().getId());
        switch (req.getExt()) {
            case USER_ACTION_UNLOCK:
            case USER_ACTION_CONFIRM:
                user.setStatus(USER_STATUS_CONFIRMED);
                break;
            case USER_ACTION_DENY:
                user.setStatus(USER_STATUS_DENIED);
                break;
            case USER_ACTION_LOCK:
                user.setStatus(USER_STATUS_LOCKED);
                break;
            default:
        }
        sysUserRepository.save(user);

        return WebResp.newInstance().msg("????????????");
    }

    @PostMapping("/update")
    public WebResp<SysUser, Long> updateUser(@RequestBody WebReq<SysUser, String> req) throws Exception {
        Assert.notNull(req.getEntity(), "?????????????????????");
        Assert.notNull(req.getEntity().getId(), "????????????????????????");
        Assert.notNull(req.getEntity().getMobile(), "????????????????????????");

        List<SysUser> sameMobileUsers = sysUserRepository.findAllByMobileAndIdNot(req.getEntity().getMobile(), req.getEntity().getId());
        if (sameMobileUsers != null && sameMobileUsers.size() > 0) {
            throw new Exception("?????????????????????");
        }
        SysUser user = sysUserRepository.getReferenceById(req.getEntity().getId());
        MyBeanUtils.copyNonNullProperties(req.getEntity(), user);
        sysUserRepository.save(user);
        return WebResp.newInstance().msg("????????????");
    }

    @PostMapping("/update-password")
    public WebResp<SysUser, Long> updatePassword(@RequestParam String params) throws UnsupportedEncodingException {
        String str = new String(Base64.getDecoder().decode(params), "utf-8");
        JSONObject obj = JSON.parseObject(str);
        String oldpass = obj.getString("oldpass");
        String newpass = obj.getString("newpass");
        String repass = obj.getString("repass");

        if (newpass == null || repass == null || !newpass.equals(repass)) {
            return WebResp.newInstance().subCode(10004).subMsg("????????????????????????????????????");
        }
        if (oldpass == null) {
            return WebResp.newInstance().subCode(10004).subMsg("?????????????????????");
        }

        AbstractAuthenticationToken token = (AbstractAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        SysUser user = (SysUser) token.getDetails();
        if (user == null || user.getId() == null) {
            return WebResp.newInstance().subCode(10002).subMsg("???????????????????????????");
        }
        SysUser sysUser = sysUserRepository.getReferenceById(user.getId());
        if (sysUser == null) {
            return WebResp.newInstance().subCode(10002).subMsg("???????????????????????????");
        }
        if (!passwordEncoder.matches(oldpass, sysUser.getPassword())) {
            return WebResp.newInstance().subCode(10004).subMsg("????????????????????????");
        }

        sysUser.setPassword(passwordEncoder.encode(newpass));
        sysUserRepository.save(sysUser);
        return WebResp.newInstance().msg("????????????").subMsg("????????????");
    }

    @PostMapping("/register")
    public WebResp<SysUser, Long> register(@RequestBody WebReq<SysUser, String> req) throws Exception {
        Assert.notNull(req.getEntity(), "?????????????????????");
        Assert.notNull(req.getEntity().getMobile(), "????????????????????????");
        if(userService.findByMobile(req.getEntity().getMobile()) != null) {
            return WebResp.newInstance().subCode(10002).subMsg("??????????????????????????????????????????????????????");
        }
        userService.register(req.getEntity());
        return WebResp.newInstance().subMsg("????????????,??????????????????????????????????????????????????????????????????????????????");
    }

    @PostMapping("/reset-password")
    public WebResp<SysUser, Long> resetPassword(@RequestBody WebReq<List<Long>, String> req) throws Exception {
        Assert.notNull(req.getEntity(), "?????????????????????");
        userService.resetPassword(req.getEntity());
        return WebResp.newInstance().subMsg("???????????????????????????");
    }
}
