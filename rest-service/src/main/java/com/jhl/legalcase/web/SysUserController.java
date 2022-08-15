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
import java.util.Collections;
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
        Assert.notNull(req.getEntity(), "entity参数不能为空");
        Assert.notNull(req.getEntity().getId(), "entity.id参数不能为空");
        Assert.notNull(req.getExt(), "ext-操作动作不能为空");

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

        return WebResp.newInstance().msg("操作成功");
    }

    @PostMapping("/update")
    public WebResp<SysUser, Long> updateUser(@RequestBody WebReq<SysUser, String> req) throws Exception {
        Assert.notNull(req.getEntity(), "数据输入不完整");
        Assert.notNull(req.getEntity().getId(), "此操作为修改操作");
        Assert.notNull(req.getEntity().getMobile(), "手机号码不能为空");

        List<SysUser> sameMobileUsers = sysUserRepository.findAllByMobileAndIdNot(req.getEntity().getMobile(), req.getEntity().getId());
        if (sameMobileUsers != null && sameMobileUsers.size() > 0) {
            throw new Exception("手机号码已存在");
        }
        SysUser user = sysUserRepository.getReferenceById(req.getEntity().getId());
        MyBeanUtils.copyNonNullProperties(req.getEntity(), user);
        sysUserRepository.save(user);
        return WebResp.newInstance().msg("操作成功");
    }

    @PostMapping("/update-password")
    public WebResp<SysUser, Long> updatePassword(@RequestParam String params) throws UnsupportedEncodingException {
        String str = new String(Base64.getDecoder().decode(params), "utf-8");
        JSONObject obj = JSON.parseObject(str);
        String oldpass = obj.getString("oldpass");
        String newpass = obj.getString("newpass");
        String repass = obj.getString("repass");

        if (newpass == null || repass == null || !newpass.equals(repass)) {
            return WebResp.newInstance().subCode(10004).subMsg("新密码和确认密码必须相同");
        }
        if (oldpass == null) {
            return WebResp.newInstance().subCode(10004).subMsg("新密码必须设置");
        }

        AbstractAuthenticationToken token = (AbstractAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        SysUser user = (SysUser) token.getDetails();
        if (user == null || user.getId() == null) {
            return WebResp.newInstance().subCode(10002).subMsg("未找到用户登录信息");
        }
        SysUser sysUser = sysUserRepository.getReferenceById(user.getId());
        if (sysUser == null) {
            return WebResp.newInstance().subCode(10002).subMsg("未找到用户登录信息");
        }
        if (!passwordEncoder.matches(oldpass, sysUser.getPassword())) {
            return WebResp.newInstance().subCode(10004).subMsg("用户原密码不正确");
        }

        sysUser.setPassword(passwordEncoder.encode(newpass));
        sysUserRepository.save(sysUser);
        return WebResp.newInstance().msg("修改成功").subMsg("修改成功");
    }

    @PostMapping("/register")
    public WebResp<SysUser, Long> register(@RequestBody WebReq<SysUser, String> req) throws Exception {
        Assert.notNull(req.getEntity(), "数据输入不完整");
        Assert.notNull(req.getEntity().getMobile(), "手机号码不能为空");
        if(userService.findByMobile(req.getEntity().getMobile()) != null) {
            return WebResp.newInstance().subCode(10002).subMsg("手机号码已存在，请重新输入正确号码。");
        }
        userService.register(req.getEntity());
        return WebResp.newInstance().subMsg("操作成功,请等待管理员审核，审核完成后可使用手机号码登录系统。");
    }

    @PostMapping("/reset-password")
    public WebResp<SysUser, Long> resetPassword(@RequestBody WebReq<List<Long>, String> req) throws Exception {
        Assert.notNull(req.getEntity(), "数据输入不完整");
        userService.resetPassword(req.getEntity());
        return WebResp.newInstance().subMsg("重置密码操作成功。");
    }
}
