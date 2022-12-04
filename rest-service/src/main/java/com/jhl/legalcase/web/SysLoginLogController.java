package com.jhl.legalcase.web;

import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;
import com.jhl.legalcase.entity.SysLoginLog;
import com.jhl.legalcase.repository.SysLoginLogRepository;
import com.jhl.legalcase.util.webmsg.WebReq;
import com.jhl.legalcase.util.webmsg.WebResp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping(value = "login-log")
public class SysLoginLogController {
    @Autowired
    SysLoginLogRepository loginLogRepository;

    @PostMapping("/list")
    public WebResp<SysLoginLog, Long> list(@RequestBody WebReq<SysLoginLog, Long> req) throws ClassNotFoundException {
        Page<SysLoginLog> result = loginLogRepository.findAll(req.specification(), req.pageable());
        return WebResp.newInstance().rows(result.getContent()).pages(result.getTotalPages()).total(result.getTotalElements());
    }

    @PostMapping("/export")
    public void export(HttpServletResponse response, @RequestBody WebReq<SysLoginLog, Long> req) throws ClassNotFoundException, IOException {
        List<SysLoginLog> list = loginLogRepository.findAll(req.specification(), req.pageable()).getContent();
        List<Map<String, ? extends Serializable>> collect = list.stream().map(log ->
                Map.of("name", log.getName() == null ? "" : log.getName(),
                        "ip", log.getIp() == null ? "" : log.getIp(),
                        "deviceType", log.getDeviceType() == null ? "" : log.getDeviceType(),
                        "browser", log.getBrowser() == null ? "" : log.getBrowser(),
                        "system", log.getSystemName() == null ? "" : log.getSystemName(),
                        "createdTime", log.getCreatedTime() == null ? "" : log.getCreatedTime(),
                        "endTime", log.getEndTime() == null ? "" : log.getEndTime())
        ).collect(Collectors.toList());
        ExcelWriter writer = ExcelUtil.getWriter(true);
        SysLoginLog.excelHeaders().entrySet().forEach(entry -> {
            writer.addHeaderAlias(entry.getKey(), entry.getValue());
        });
        writer.write(collect, true);
        writer.autoSizeColumnAll();

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8");
        String fileName = URLEncoder.encode("用户登录信息", "UTF-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ".xlsx");

        ServletOutputStream out = response.getOutputStream();
        writer.flush(out, true);
        out.close();
        writer.close();
    }
}
