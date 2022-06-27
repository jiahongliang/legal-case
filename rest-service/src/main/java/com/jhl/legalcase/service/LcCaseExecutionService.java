package com.jhl.legalcase.service;

import com.jhl.legalcase.entity.LcCaseExecution;
import com.jhl.legalcase.entity.LcCaseExecutionStep;
import com.jhl.legalcase.entity.LcCaseExecutionStepItem;
import com.jhl.legalcase.entity.LcCaseExecutionSuspect;
import com.jhl.legalcase.repository.LcCaseExecutionRepository;
import com.jhl.legalcase.repository.LcCaseExecutionStepItemRepository;
import com.jhl.legalcase.repository.LcCaseExecutionStepRepository;
import com.jhl.legalcase.repository.LcCaseExecutionSuspectRepository;
import com.jhl.legalcase.util.webmsg.WebReq;
import com.jhl.legalcase.web.vo.LcCaseExecutionStepItemVo;
import com.jhl.legalcase.web.vo.LcCaseExecutionStepVo;
import com.jhl.legalcase.web.vo.LcCaseExecutionSuspectVo;
import com.jhl.legalcase.web.vo.LcCaseExecutionVo;
import lombok.SneakyThrows;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.jhl.legalcase.LegalCaseConstants.CASE_EXECUTION_CREATED;
import static com.jhl.legalcase.LegalCaseConstants.CASE_EXECUTION_STEP_ITEM_CREATED;

@Service
@Transactional(rollbackFor = Exception.class)
public class LcCaseExecutionService {
    @Autowired
    private LcCaseExecutionRepository caseExecutionRepository;
    @Autowired
    private LcCaseExecutionStepItemRepository caseExecutionStepItemRepository;
    @Autowired
    private LcCaseExecutionStepRepository caseExecutionStepRepository;
    @Autowired
    private LcCaseExecutionSuspectRepository caseExecutionSuspectRepository;

    public void saveCaseExcution(LcCaseExecutionVo caseExecutionVo) {
        LcCaseExecution caseExecution = LcCaseExecution.builder().typeId(caseExecutionVo.getTypeId())
                .name(caseExecutionVo.getName())
                .suspects(caseExecutionVo.getSuspects() != null ? caseExecutionVo.getSuspects().stream().map(obj -> obj.getName()).collect(Collectors.joining(",")) : "")
                .status(CASE_EXECUTION_CREATED)
                .build();
        caseExecutionRepository.save(caseExecution);

        List<LcCaseExecutionSuspect> lcCaseExecutionSuspects = caseExecutionVo.getSuspects().stream().map(obj -> LcCaseExecutionSuspect.builder().name(obj.getName()).executionId(caseExecution.getId()).build()).toList();
        caseExecutionSuspectRepository.saveAll(lcCaseExecutionSuspects);

        caseExecutionVo.getSteps().forEach(obj -> {
            LcCaseExecutionStep step = LcCaseExecutionStep.builder().executionId(caseExecution.getId()).name(obj.getName()).build();
            caseExecutionStepRepository.save(step);

            lcCaseExecutionSuspects.forEach(suspect -> {
                List<LcCaseExecutionStepItem> lcCaseExecutionStepItems = obj.getItems().stream().map(item -> {
                    return LcCaseExecutionStepItem.builder().executionId(caseExecution.getId()).stepId(step.getId()).itemName(item.getItemName()).status(CASE_EXECUTION_STEP_ITEM_CREATED).suspectId(suspect.getId()).build();
                }).toList();
                caseExecutionStepItemRepository.saveAll(lcCaseExecutionStepItems);
            });
        });
    }

    public LcCaseExecutionVo get(@NonNull LcCaseExecution caseExecution) {
        List<LcCaseExecutionSuspect> suspects = getSuspects(caseExecution.getId());
        List<LcCaseExecutionStep> steps = getSteps(caseExecution.getId());
        List<LcCaseExecutionStepItem> stepItems = getStepItems(caseExecution.getId());

        LcCaseExecutionVo executionVo = LcCaseExecutionVo.builder()
                .suspects(suspects.stream().map(obj -> {
                    LcCaseExecutionSuspectVo vo = LcCaseExecutionSuspectVo.builder().build();
                    BeanUtils.copyProperties(obj, vo);
                    return vo;
                }).toList())
                .steps(steps.stream().map(obj -> {
                    LcCaseExecutionStepVo vo = LcCaseExecutionStepVo.builder().build();
                    BeanUtils.copyProperties(obj, vo);
                    vo.setItems(stepItems.stream().filter(stepItem -> stepItem.getStepId().equals(obj.getId())).map(stepItem -> {
                        LcCaseExecutionStepItemVo stepItemVo = LcCaseExecutionStepItemVo.builder().build();
                        BeanUtils.copyProperties(stepItem, stepItemVo);
                        return stepItemVo;
                    }).toList());
                    return vo;
                }).toList())
                .build();

        BeanUtils.copyProperties(caseExecution, executionVo);

        return executionVo;
    }
    @SneakyThrows
    public LcCaseExecutionVo get(@NonNull Long id) {
        LcCaseExecution caseExecution = caseExecutionRepository.getReferenceById(id);
        if (caseExecution == null) {
            return LcCaseExecutionVo.builder().build();
        }
        return get(caseExecution);
    }

    @SneakyThrows
    public List<LcCaseExecutionSuspect> getSuspects(@NonNull Long executionId) {
        WebReq<LcCaseExecutionSuspect, Long> req = new WebReq();
        req.setEntity(LcCaseExecutionSuspect.builder().executionId(executionId).build());
        return caseExecutionSuspectRepository.findAll(req.specification());
    }

    @SneakyThrows
    public List<LcCaseExecutionStep> getSteps(@NonNull Long executionId) {
        WebReq<LcCaseExecutionStep, Long> req = new WebReq();
        req.setEntity(LcCaseExecutionStep.builder().executionId(executionId).build());
        return caseExecutionStepRepository.findAll(req.specification());
    }

    @SneakyThrows
    public List<LcCaseExecutionStepItem> getStepItems(@NonNull Long executionId) {
        WebReq<LcCaseExecutionStepItem, Long> req = new WebReq();
        req.setEntity(LcCaseExecutionStepItem.builder().executionId(executionId).build());
        return caseExecutionStepItemRepository.findAll(req.specification());
    }
}
