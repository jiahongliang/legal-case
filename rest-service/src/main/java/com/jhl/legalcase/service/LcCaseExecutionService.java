package com.jhl.legalcase.service;

import com.jhl.legalcase.entity.*;
import com.jhl.legalcase.repository.*;
import com.jhl.legalcase.util.pinyin.PinyinUtil;
import com.jhl.legalcase.util.webmsg.WebReq;
import com.jhl.legalcase.web.vo.LcCaseExecutionStepItemVo;
import com.jhl.legalcase.web.vo.LcCaseExecutionStepVo;
import com.jhl.legalcase.web.vo.LcCaseExecutionVo;
import lombok.SneakyThrows;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
    private LcCaseExecutionCommentRepository caseExecutionCommentRepository;
    @Autowired
    private LcCaseExecutionSuspectRepository caseExecutionSuspectRepository;
    @Autowired
    private LcCaseTypeRepository caseTypeRepository;
    @Autowired
    private SysUserRepository userRepository;

    public Long saveCaseExcution(LcCaseExecutionVo caseExecutionVo) {
        LcCaseExecution caseExecution = LcCaseExecution.builder().typeId(caseExecutionVo.getTypeId())
                .name(caseExecutionVo.getName())
                .nameSearch(caseExecutionVo.getName() == null ? "" : caseExecutionVo.getName() + "|" + PinyinUtil.toFirstChar(caseExecutionVo.getName()))
                .status(CASE_EXECUTION_CREATED)
                .build();
        caseExecutionRepository.save(caseExecution);


        caseExecutionVo.getSteps().forEach(obj -> {
            LcCaseExecutionStep step = LcCaseExecutionStep.builder()
                    .executionId(caseExecution.getId())
                    .name(obj.getName())
                    .suspect(obj.getSuspect())
                    .build();
            caseExecutionStepRepository.save(step);

            obj.getCaseTypeStepItems().forEach(stepItem -> {
                LcCaseExecutionStepItem item = LcCaseExecutionStepItem.builder()
                        .executionId(caseExecution.getId())
                        .stepId(step.getId())
                        .name(stepItem.getName())
                        .lawTitle(stepItem.getLawTitle())
                        .status(CASE_EXECUTION_STEP_ITEM_CREATED)
                        .build();
                caseExecutionStepItemRepository.save(item);
            });
        });
        caseExecutionVo.getComments().forEach(comment -> {
            if (comment.getId() < 0) {
                comment.setId(null);
            }
            comment.setExecutionId(caseExecution.getId());
        });
        caseExecutionCommentRepository.saveAll(caseExecutionVo.getComments());
        return caseExecution.getId();
    }


    public void removeCaseExcution(LcCaseExecutionVo vo) {
        caseExecutionCommentRepository.deleteAllByExecutionId(vo.getId());
        caseExecutionStepItemRepository.deleteAllByExecutionId(vo.getId());
        caseExecutionStepRepository.deleteAllByExecutionId(vo.getId());
        caseExecutionSuspectRepository.deleteAllByExecutionId(vo.getId());
        caseExecutionRepository.deleteById(vo.getId());
    }

    public LcCaseExecutionVo get(@NonNull LcCaseExecution caseExecution) {
        List<LcCaseExecutionStep> steps = getSteps(caseExecution.getId());
        List<LcCaseExecutionStepItem> stepItems = getStepItems(caseExecution.getId());
        List<LcCaseExecutionComment> comments = caseExecutionCommentRepository.findAllByExecutionId(caseExecution.getId());

        LcCaseExecutionVo executionVo = LcCaseExecutionVo.builder()
                .steps(steps.stream().map(obj -> {
                    LcCaseExecutionStepVo vo = LcCaseExecutionStepVo.builder().build();
                    BeanUtils.copyProperties(obj, vo);
                    vo.setCaseTypeStepItems(stepItems.stream().filter(item -> item.getStepId().equals(obj.getId()))
                            .map(item -> {
                                LcCaseExecutionStepItemVo itemVo = LcCaseExecutionStepItemVo.builder().build();
                                BeanUtils.copyProperties(item, itemVo);
                                return itemVo;
                            })
                            .toList());
                    return vo;
                }).toList())
                .comments(comments)
                .build();

        BeanUtils.copyProperties(caseExecution, executionVo);
        if (executionVo.getTypeId() != null) {
            LcCaseType caseType = caseTypeRepository.getReferenceById(executionVo.getTypeId());
            if (caseType != null) {
                executionVo.setTypeName(caseType.getName());
            }
        }
        if (executionVo.getCreatedBy() != null) {
            SysUser user = userRepository.getReferenceById(executionVo.getCreatedBy());
            if (user != null) {
                executionVo.setCreator(user.getName());
            }
        }

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
