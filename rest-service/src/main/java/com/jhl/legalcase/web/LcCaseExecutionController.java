package com.jhl.legalcase.web;

import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;
import com.jhl.legalcase.entity.*;
import com.jhl.legalcase.repository.LcCaseExecutionCommentRepository;
import com.jhl.legalcase.repository.LcCaseExecutionRepository;
import com.jhl.legalcase.repository.LcCaseExecutionStepItemRepository;
import com.jhl.legalcase.repository.LcCaseExecutionStepRepository;
import com.jhl.legalcase.service.LcCaseExecutionService;
import com.jhl.legalcase.util.webmsg.WebReq;
import com.jhl.legalcase.util.webmsg.WebResp;
import com.jhl.legalcase.web.vo.LcCaseExecutionStepItemVo;
import com.jhl.legalcase.web.vo.LcCaseExecutionStepVo;
import com.jhl.legalcase.web.vo.LcCaseExecutionVo;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static com.jhl.legalcase.LegalCaseConstants.CASE_EXECUTION_STEP_ITEM_COMPLETED;
import static com.jhl.legalcase.LegalCaseConstants.CASE_EXECUTION_STEP_ITEM_CREATED;

@Slf4j
@RestController
@RequestMapping(value = "case-execution")
public class LcCaseExecutionController {

    @Autowired
    private LcCaseExecutionRepository caseExecutionRepository;
    @Autowired
    private LcCaseExecutionStepItemRepository caseExecutionStepItemRepository;
    @Autowired
    private LcCaseExecutionStepRepository lcCaseExecutionStepRepository;
    @Autowired
    private LcCaseExecutionService caseExecutionService;
    @Autowired
    LcCaseExecutionCommentRepository lcCaseExecutionCommentRepository;

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
    @PostMapping("/remove")
    public WebResp<LcCaseExecutionVo, Long> remove(@RequestBody WebReq<LcCaseExecutionVo, Long> req) throws ClassNotFoundException {
        Assert.notNull(req.getEntity(), "参数不能为空");
        caseExecutionService.removeCaseExcution(req.getEntity());
        return WebResp.newInstance();
    }

    @Transactional
    @PostMapping("/handle")
    public WebResp<LcCaseExecutionVo, Long> handle(@RequestBody WebReq<LcCaseExecutionVo, Long> req) throws ClassNotFoundException {
        Assert.notNull(req.getEntity(), "参数不能为空");
        List<LcCaseExecutionStepItemVo> collect = req.getEntity().getSteps().stream().collect(() ->
                        new ArrayList<>(),
                (list, step) -> {
                    LcCaseExecutionStep lcCaseExecutionStep = LcCaseExecutionStep.builder()
                            .executionId(req.getEntity().getId())
                            .name(step.getName())
                            .suspect(step.getSuspect())
                            .id(step.getId()).build();
                    if (lcCaseExecutionStep.getId() == null) {
                        lcCaseExecutionStepRepository.save(lcCaseExecutionStep);
                    }
                    list.addAll(step.getCaseTypeStepItems().stream().map(item -> {
                        item.setStepId(lcCaseExecutionStep.getId());
                        item.setExecutionId(req.getEntity().getId());
                        return item;
                    }).toList());
                },
                (one, two) -> one.addAll(two)
        );
        List<LcCaseExecutionStepItem> lcCaseExecutionStepItems = collect.stream().map(item -> {
            LcCaseExecutionStepItem build = LcCaseExecutionStepItem.builder().build();
            BeanUtils.copyProperties(item, build);
            return build;
        }).toList();
        caseExecutionStepItemRepository.saveAll(lcCaseExecutionStepItems);
        if (!CollectionUtils.isEmpty(req.getEntity().getComments())) {
            lcCaseExecutionCommentRepository.saveAll(req.getEntity().getComments());
        }
        return WebResp.newInstance();
    }

    @GetMapping("/export-one/{id}")
    public void export(HttpServletResponse response, @PathVariable Long id) throws ClassNotFoundException, IOException {
        LcCaseExecution execution = caseExecutionRepository.getReferenceById(id);
        LcCaseExecutionVo executionVo = caseExecutionService.get(execution);

        AbstractAuthenticationToken token = (AbstractAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        final SysUser user = (SysUser) token.getDetails();

        ExcelWriter writer = ExcelUtil.getWriter(true);

        int rowIndex = 0;

        CellStyle headCellStyle1 = writer.getHeadCellStyle();
        headCellStyle1.setAlignment(HorizontalAlignment.CENTER);
        Font head1Font = writer.createFont();
        head1Font.setFontHeightInPoints((short) 14);
        headCellStyle1.setFont(head1Font);
        headCellStyle1.setFillBackgroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        writer.merge(rowIndex, 0, rowIndex, 3, "案件审核登记表", headCellStyle1);
        writer.setRowHeight(rowIndex, 30);
        writer.passCurrentRow();

        rowIndex++;

        CellStyle cellStyle1 = writer.createCellStyle();
        cellStyle1.setAlignment(HorizontalAlignment.CENTER);
        cellStyle1.setVerticalAlignment(VerticalAlignment.CENTER);
        cellStyle1.setBorderTop(BorderStyle.THIN);
        cellStyle1.setBorderBottom(BorderStyle.THIN);
        cellStyle1.setBorderLeft(BorderStyle.THIN);
        cellStyle1.setBorderRight(BorderStyle.THIN);
        Font font = writer.createFont();
        font.setFontHeightInPoints((short) 11);
        font.setBold(true);
        cellStyle1.setFont(font);
        writer.merge(rowIndex, rowIndex, 1, 2, "", cellStyle1);
        writer.writeRow(Arrays.asList("办案单位", "案件名称", "", "办案人"));
        writer.setRowStyleIfHasData(rowIndex, cellStyle1);
        writer.setRowHeight(rowIndex, 25);

        rowIndex++;

        CellStyle cellStyle = writer.getCellStyle();
        cellStyle.setAlignment(HorizontalAlignment.CENTER);
        cellStyle.setBorderTop(BorderStyle.THIN);
        cellStyle.setBorderBottom(BorderStyle.THIN);
        cellStyle.setBorderLeft(BorderStyle.THIN);
        cellStyle.setBorderRight(BorderStyle.THIN);
        writer.merge(rowIndex, rowIndex, 1, 2, "", cellStyle);
        writer.writeRow(Arrays.asList(user.getDeptName(), executionVo.getName(), "", user.getName()));
        writer.setRowStyleIfHasData(rowIndex, cellStyle);
        writer.setRowHeight(rowIndex, 25);

        rowIndex++;

        writer.writeRow(Arrays.asList("环节", "嫌疑人", "事项", "备注"));
        writer.setRowStyleIfHasData(rowIndex, cellStyle1);
        writer.setRowHeight(rowIndex, 25);

        rowIndex++;

        for (LcCaseExecutionStepVo step : executionVo.getSteps()) {
            if (!CollectionUtils.isEmpty(step.getCaseTypeStepItems())) {
                step.setCaseTypeStepItems(step.getCaseTypeStepItems().stream().filter(item -> CASE_EXECUTION_STEP_ITEM_CREATED.equals(item.getStatus())).toList());
            }
            int stepStartIndex = rowIndex;
            for (LcCaseExecutionStepItemVo item : step.getCaseTypeStepItems()) {
                writer.writeRow(Arrays.asList(step.getName(), step.getSuspect(), item.getName(), item.getLawTitle()));
                writer.setRowHeight(rowIndex, 25);
                rowIndex++;
            }
            if (rowIndex - 1 > stepStartIndex) {
                writer.merge(stepStartIndex, rowIndex - 1, 0, 0, step.getName(), cellStyle);
                writer.merge(stepStartIndex, rowIndex - 1, 1, 1, step.getSuspect(), cellStyle);
            }
        }

        int commentStartRowIndex = rowIndex;
        for (LcCaseExecutionComment comment : executionVo.getComments()) {
            writer.merge(rowIndex, rowIndex, 1, 3, comment.getName(), cellStyle);
            writer.setRowHeight(rowIndex, 25);
            writer.passCurrentRow();
            rowIndex++;
        }

        if (rowIndex > commentStartRowIndex) {
            writer.merge(commentStartRowIndex, rowIndex - 1, 0, 0, "备注", cellStyle);
            writer.setRowHeight(rowIndex, 25);
        } else {
            writer.merge(rowIndex, rowIndex, 1, 3, "-", cellStyle);
            writer.writeRow(Arrays.asList("备注", "-"));
            writer.setRowStyleIfHasData(rowIndex, cellStyle);
            writer.setRowHeight(rowIndex, 25);
        }

        writer.setColumnWidth(0, 15);
        writer.setColumnWidth(1, 10);
        writer.setColumnWidth(2, 35);
        writer.setColumnWidth(3, 35);

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8");
        String fileName = URLEncoder.encode("案件审核登记表", "UTF-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ".xlsx");

        ServletOutputStream out = response.getOutputStream();
        writer.flush(out, true);
        out.close();
        writer.close();
    }
}
