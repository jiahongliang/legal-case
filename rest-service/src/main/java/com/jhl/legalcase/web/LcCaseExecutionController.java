package com.jhl.legalcase.web;

import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;
import com.jhl.legalcase.entity.LcCaseExecution;
import com.jhl.legalcase.entity.LcCaseExecutionStepItem;
import com.jhl.legalcase.repository.LcCaseExecutionRepository;
import com.jhl.legalcase.repository.LcCaseExecutionStepItemRepository;
import com.jhl.legalcase.service.LcCaseExecutionService;
import com.jhl.legalcase.util.webmsg.WebReq;
import com.jhl.legalcase.util.webmsg.WebResp;
import com.jhl.legalcase.web.vo.LcCaseExecutionStepItemVo;
import com.jhl.legalcase.web.vo.LcCaseExecutionVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.jhl.legalcase.LegalCaseConstants.CASE_EXECUTION_STEP_ITEM_COMPLETED;

@Slf4j
@RestController
@RequestMapping(value = "case-execution")
public class LcCaseExecutionController {

    @Autowired
    private LcCaseExecutionRepository caseExecutionRepository;
    @Autowired
    private LcCaseExecutionStepItemRepository caseExecutionStepItemRepository;
    @Autowired
    private LcCaseExecutionService caseExecutionService;

    @PostMapping("/list")
    public WebResp<LcCaseExecutionVo, Long> list(@RequestBody WebReq<LcCaseExecution, Long> req) throws ClassNotFoundException {
        Page<LcCaseExecution> result = caseExecutionRepository.findAll(req.specification(), req.pageable());
        Page<LcCaseExecutionVo> map = result.map(obj -> caseExecutionService.get(obj));
        return WebResp.newInstance().rows(map.getContent()).pages(result.getTotalPages()).total(result.getTotalElements());
    }

    @PostMapping("/export")
    public void export(HttpServletResponse response, @RequestBody WebReq<LcCaseExecution, Long> req) throws ClassNotFoundException, IOException {
        Page<LcCaseExecution> result = caseExecutionRepository.findAll(req.specification(), req.pageable());
        Page<LcCaseExecutionVo> map = result.map(obj -> caseExecutionService.get(obj));
        List<LcCaseExecutionVo> list = map.getContent();
        List<Map<String, Object>> records = list.stream().map(vo -> vo.excelRecord()).toList();
        ExcelWriter writer = ExcelUtil.getWriter(true);
        LcCaseExecutionVo.excelHeaders().entrySet().forEach(entry -> {
            writer.addHeaderAlias(entry.getKey(), entry.getValue());
        });
        writer.write(records, true);
        writer.autoSizeColumnAll();

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8");
        String fileName = URLEncoder.encode("案件管理信息", "UTF-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ".xlsx");

        ServletOutputStream out = response.getOutputStream();
        writer.flush(out, true);
        out.close();
        writer.close();
    }

    @PostMapping("/create")
    public WebResp<LcCaseExecutionVo, Long> create(@RequestBody WebReq<LcCaseExecutionVo, Long> req) throws ClassNotFoundException {
        Assert.notNull(req.getEntity(), "录入数据不能为空");
        caseExecutionService.saveCaseExcution(req.getEntity());
        return WebResp.newInstance();
    }

    @Transactional
    @PostMapping("/complete")
    public WebResp<LcCaseExecutionVo, Long> complete(@RequestBody WebReq<LcCaseExecutionVo, Long> req) throws ClassNotFoundException {
        Assert.notNull(req.getEntity(), "参数不能为空");
        LcCaseExecution caseExecution = caseExecutionRepository.getReferenceById(req.getEntity().getId());
        caseExecution.setStatus(CASE_EXECUTION_STEP_ITEM_COMPLETED);
        caseExecutionRepository.save(caseExecution);
        return WebResp.newInstance();
    }

    @Transactional
    @PostMapping("/handle")
    public WebResp<LcCaseExecutionVo, Long> handle(@RequestBody WebReq<LcCaseExecutionVo, Long> req) throws ClassNotFoundException {
        Assert.notNull(req.getEntity(), "参数不能为空");
        List<LcCaseExecutionStepItemVo> collect = req.getEntity().getSteps().stream().collect(() -> new ArrayList<>(), (list, step) -> list.addAll(step.getCaseTypeStepItems()), (one, two) -> one.addAll(two));
        List<LcCaseExecutionStepItem> lcCaseExecutionStepItems = collect.stream().map(item -> {
            LcCaseExecutionStepItem build = LcCaseExecutionStepItem.builder().build();
            BeanUtils.copyProperties(item, build);
            return build;
        }).toList();
        caseExecutionStepItemRepository.saveAll(lcCaseExecutionStepItems);
        return WebResp.newInstance();
    }
}
