package com.jhl.legalcase.web;

import com.jhl.legalcase.entity.SysMenuOrder;
import com.jhl.legalcase.entity.SysUser;
import com.jhl.legalcase.repository.SysMenuOrderRepository;
import com.jhl.legalcase.util.webmsg.WebReq;
import com.jhl.legalcase.util.webmsg.WebResp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "menu-order")
public class SysMenuOrderController {

    @Autowired
    SysMenuOrderRepository menuOrderRepository;

    @GetMapping("/list")
    public WebResp<SysMenuOrder, Long> list() {
        WebResp<SysMenuOrder, Long> resp = WebResp.newInstance();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        SysUser user = (SysUser) authentication.getDetails();
        if (user != null && user.getId() != null) {
            resp.setRows(menuOrderRepository.findByUserId(user.getId()));
        }
        return resp;
    }

    @PostMapping("/save")
    public WebResp<SysMenuOrder, Long> save(@RequestBody WebReq<SysMenuOrder, List<SysMenuOrder>> req) {
        Assert.notNull(req.getExt(), "请求数据为空");
        Assert.notEmpty(req.getExt(), "请求数据为空");
        WebResp<SysMenuOrder, Long> resp = WebResp.newInstance();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        SysUser user = (SysUser) authentication.getDetails();

        if (user != null && user.getId() != null) {
            menuOrderRepository.deleteAllByUserId(user.getId());
            List<SysMenuOrder> orders = req.getExt().stream().map(sysMenuOrder -> {
                sysMenuOrder.setUserId(user.getId());
                return sysMenuOrder;
            }).toList();
            resp.setRows(menuOrderRepository.saveAll(orders));
        }

        return resp;
    }
}
