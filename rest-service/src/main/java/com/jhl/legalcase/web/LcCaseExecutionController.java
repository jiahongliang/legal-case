package com.jhl.legalcase.web;

import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;
import com.jhl.legalcase.entity.*;
import com.jhl.legalcase.repository.*;
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
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

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
    @Autowired
    LcCaseTypeStepRepository lcCaseTypeStepRepository;
    @Autowired
    LcCaseTypeRepository lcCaseTypeRepository;

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
        LcCaseExecutionVo entity = req.getEntity();
        if (entity.getId() != null) {
            caseExecutionService.removeCaseExcution(entity);
            entity.setId(null);
        }
        Long id = caseExecutionService.saveCaseExcution(entity);

        LcCaseExecution execution = caseExecutionRepository.getReferenceById(id);
        LcCaseExecutionVo executionVo = caseExecutionService.get(execution);
        return WebResp.newInstance().rows(Arrays.asList(executionVo)).ext(id);
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
        List<Long> stepIds = req.getEntity().getSteps().stream().filter(step -> step.getId() != null).map(step -> step.getId()).collect(Collectors.toList());
        lcCaseExecutionStepRepository.deleteAllByIdNotInAndExecutionId(stepIds, req.getEntity().getId());
        caseExecutionStepItemRepository.deleteAllByStepIdNotInAndExecutionId(stepIds, req.getEntity().getId());
        List<LcCaseExecutionStepItemVo> collect = req.getEntity().getSteps().stream().collect(() ->
                        new ArrayList<>(),
                (list, step) -> {
                    LcCaseExecutionStep lcCaseExecutionStep = LcCaseExecutionStep.builder()
                            .executionId(req.getEntity().getId())
                            .name(step.getName())
                            .suspect(step.getSuspect())
                            .comment(step.getComment())
                            .id(step.getId()).build();
                    lcCaseExecutionStepRepository.save(lcCaseExecutionStep);
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
            //List<Long> existsIds = req.getEntity().getComments().stream().filter(c -> c.getId() != null && c.getId() > 0).map(c -> c.getId()).collect(Collectors.toList());
            //lcCaseExecutionCommentRepository.deleteAllByIdNotInAndExecutionId(existsIds, req.getEntity().getId());
            List<LcCaseExecutionComment> comments = req.getEntity().getComments().stream().map(c -> {
                if (c.getId() != null && c.getId() < 0) {
                    c.setId(null);
                }
                c.setExecutionId(req.getEntity().getId());
                return c;
            }).collect(Collectors.toList());
            lcCaseExecutionCommentRepository.saveAll(comments);
        } else {
            lcCaseExecutionCommentRepository.deleteAllByExecutionId(req.getEntity().getId());
        }

        LcCaseExecution execution = caseExecutionRepository.getReferenceById(req.getEntity().getId());
        LcCaseExecutionVo executionVo = caseExecutionService.get(execution);
        return WebResp.newInstance().rows(Arrays.asList(executionVo));
    }

    @GetMapping("/export-one/{id}")
    public void export(HttpServletResponse response, @PathVariable Long id) throws ClassNotFoundException, IOException {
        LcCaseExecution execution = caseExecutionRepository.getReferenceById(id);
        LcCaseExecutionVo executionVo = caseExecutionService.get(execution);

        AbstractAuthenticationToken token = (AbstractAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        final SysUser user = (SysUser) token.getDetails();

        ExcelWriter writer = ExcelUtil.getWriter(true);

        int rowIndex = 0;

        CellStyle headCellStyle1 = writer.createCellStyle();//.getHeadCellStyle();
        headCellStyle1.setAlignment(HorizontalAlignment.CENTER);
        headCellStyle1.setVerticalAlignment(VerticalAlignment.CENTER);
        /*headCellStyle1.setBorderTop(BorderStyle.THIN);
        headCellStyle1.setBorderBottom(BorderStyle.THIN);
        headCellStyle1.setBorderLeft(BorderStyle.THIN);
        headCellStyle1.setBorderRight(BorderStyle.THIN);*/
        Font head1Font = writer.createFont();
        head1Font.setFontHeightInPoints((short) 26);
        headCellStyle1.setFont(head1Font);
        //headCellStyle1.setFillBackgroundColor(IndexedColors.WHITE1.getIndex());
        writer.merge(rowIndex, 0, 0, 4, "案件审核登记表", headCellStyle1);
        writer.setRowHeight(rowIndex, 40);
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
        font.setFontHeightInPoints((short) 14);
        font.setBold(true);
        cellStyle1.setFont(font);
        writer.merge(rowIndex, rowIndex, 0, 1, "", cellStyle1);
        writer.merge(rowIndex, rowIndex, 3, 4, "", cellStyle1);
        writer.writeRow(Arrays.asList("办案单位", "", "审核人", "案件名称"));
        writer.setRowStyleIfHasData(rowIndex, cellStyle1);
        writer.setRowHeight(rowIndex, 25);

        rowIndex++;

        CellStyle cellStyle = writer.getCellStyle();
        cellStyle.setAlignment(HorizontalAlignment.CENTER);
        cellStyle.setBorderTop(BorderStyle.THIN);
        cellStyle.setBorderBottom(BorderStyle.THIN);
        cellStyle.setBorderLeft(BorderStyle.THIN);
        cellStyle.setBorderRight(BorderStyle.THIN);
        Font font1 = writer.createFont();
        font1.setFontHeightInPoints((short) 14);
        font1.setBold(false);
        cellStyle.setFont(font1);
        writer.merge(rowIndex, rowIndex, 0, 1, "", cellStyle);
        writer.merge(rowIndex, rowIndex, 3, 4, "", cellStyle);
        writer.writeRow(Arrays.asList(user.getDeptName(), "", user.getName(), executionVo.getName()));
        writer.setRowStyleIfHasData(rowIndex, cellStyle);
        writer.setRowHeight(rowIndex, 25);

        rowIndex++;

        CellStyle cellStyle2 = writer.createCellStyle();
        cellStyle2.setAlignment(HorizontalAlignment.CENTER);
        cellStyle2.setVerticalAlignment(VerticalAlignment.CENTER);
        cellStyle2.setBorderTop(BorderStyle.THIN);
        cellStyle2.setBorderBottom(BorderStyle.THIN);
        cellStyle2.setBorderLeft(BorderStyle.THIN);
        cellStyle2.setBorderRight(BorderStyle.THIN);
        Font font2 = writer.createFont();
        font2.setFontHeightInPoints((short) 12);
        font2.setBold(true);
        cellStyle2.setFont(font2);

        writer.writeRow(Arrays.asList("环节", "对象", "事项", "依据", "备注"));
        writer.setRowStyleIfHasData(rowIndex, cellStyle2);
        writer.setRowHeight(rowIndex, 25);

        rowIndex++;

        CellStyle cellStyle3 = writer.createCellStyle();
        cellStyle3.setAlignment(HorizontalAlignment.CENTER);
        cellStyle3.setVerticalAlignment(VerticalAlignment.CENTER);
        cellStyle3.setBorderTop(BorderStyle.THIN);
        cellStyle3.setBorderBottom(BorderStyle.THIN);
        cellStyle3.setBorderLeft(BorderStyle.THIN);
        cellStyle3.setBorderRight(BorderStyle.THIN);
        Font font3 = writer.createFont();
        font3.setFontHeightInPoints((short) 12);
        font3.setBold(false);
        cellStyle3.setFont(font3);

        Pattern pattern = Pattern.compile("[\u4e00-\u9fa5]");
        LcCaseType caseType = lcCaseTypeRepository.getReferenceById(execution.getTypeId());
        List<LcCaseTypeStep> caseTypeStepList = lcCaseTypeStepRepository.findAllByCaseType(caseType);
        //Map<String, Integer> caseTypeStepMap = caseTypeStepList.stream().collect(Collectors.toMap(LcCaseTypeStep::getName, LcCaseTypeStep::getOrderValue));
        Map<String, Integer> caseTypeStepMap = new HashMap<>();
        for (LcCaseTypeStep step : caseTypeStepList) {
            if (caseTypeStepMap.get(step.getName()) == null) {
                caseTypeStepMap.put(step.getName(), step.getOrderValue());
            }
        }
        List<LcCaseExecutionStepVo> stepVos = executionVo.getSteps().stream().sorted((a, b) -> {
            String x = caseTypeStepMap.get(a.getName()) == null ? a.getSuspect() : (String.format("%06d", caseTypeStepMap.get(a.getName())) + a.getSuspect());
            String y = caseTypeStepMap.get(b.getName()) == null ? b.getSuspect() : (String.format("%06d", caseTypeStepMap.get(b.getName())) + b.getSuspect());
            return x.compareTo(y);
        }).collect(Collectors.toList());
        for (LcCaseExecutionStepVo step : stepVos) {
            if (!CollectionUtils.isEmpty(step.getCaseTypeStepItems())) {
                step.setCaseTypeStepItems(step.getCaseTypeStepItems().stream().filter(item -> CASE_EXECUTION_STEP_ITEM_CREATED.equals(item.getStatus())).toList());
            }
            int stepStartIndex = rowIndex;
            for (LcCaseExecutionStepItemVo item : step.getCaseTypeStepItems()) {
                writer.writeRow(Arrays.asList(step.getName(), step.getSuspect(), item.getName(), item.getLawTitle(), ""));
                writer.setRowHeight(rowIndex, 25);
                writer.setRowStyleIfHasData(rowIndex, cellStyle3);
                rowIndex++;
            }

            if(StringUtils.hasLength(step.getComment())) {
                Matcher matcher = pattern.matcher(step.getComment());
                if(matcher.find()) {
                    writer.writeRow(Arrays.asList(step.getName(), step.getSuspect(), step.getComment(), "自定义", ""));
                    writer.setRowHeight(rowIndex, 25);
                    writer.setRowStyleIfHasData(rowIndex, cellStyle3);
                    rowIndex++;
                }
            }

            if (rowIndex - 1 > stepStartIndex) {
                writer.merge(stepStartIndex, rowIndex - 1, 0, 0, step.getName(), cellStyle3);
                writer.merge(stepStartIndex, rowIndex - 1, 1, 1, step.getSuspect(), cellStyle3);
            }
        }

        int commentStartRowIndex = rowIndex;
        List<LcCaseExecutionComment> comments = executionVo.getComments().stream().filter(comment -> comment.getStatus() == null || comment.getStatus().equals(1)).toList();
        if (CollectionUtils.isEmpty(comments)) {
            writer.merge(rowIndex, rowIndex, 1, 3, "-", cellStyle3);
            writer.writeRow(Arrays.asList("备注", "-", ""));
            writer.setRowStyleIfHasData(rowIndex, cellStyle3);
            writer.setRowHeight(rowIndex, 25);
            rowIndex++;
        } else if (comments.size() == 1) {
            writer.merge(rowIndex, rowIndex, 1, 3, "-", cellStyle3);
            writer.writeRow(Arrays.asList("备注", comments.get(0).getName(), ""));
            writer.setRowStyleIfHasData(rowIndex, cellStyle3);
            writer.setRowHeight(rowIndex, 25);
            rowIndex++;
        } else {
            for (LcCaseExecutionComment comment : comments) {
                writer.merge(rowIndex, rowIndex, 1, 3, comment.getName(), cellStyle3);
                writer.setRowHeight(rowIndex, 25);
                writer.setRowStyleIfHasData(rowIndex, cellStyle3);
                writer.passCurrentRow();
                rowIndex++;
            }
            writer.merge(commentStartRowIndex, rowIndex - 1, 0, 0, "备注", cellStyle3);
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

    public static void main(String[] args) {
        String format = String.format("%07d", 1);
        System.out.println(format);
    }
}
