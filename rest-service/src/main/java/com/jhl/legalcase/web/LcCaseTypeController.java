package com.jhl.legalcase.web;

import com.jhl.legalcase.entity.LcCaseType;
import com.jhl.legalcase.entity.LcCaseTypeStep;
import com.jhl.legalcase.entity.LcCaseTypeStepItem;
import com.jhl.legalcase.repository.LcCaseTypeRepository;
import com.jhl.legalcase.repository.LcCaseTypeStepItemRepository;
import com.jhl.legalcase.repository.LcCaseTypeStepRepository;
import com.jhl.legalcase.util.common.MyBeanUtils;
import com.jhl.legalcase.util.webmsg.WebReq;
import com.jhl.legalcase.util.webmsg.WebResp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author
 */
@Slf4j
@RestController
@RequestMapping(value = "case-type")
public class LcCaseTypeController {
    @Autowired
    private LcCaseTypeRepository caseTypeRepository;

    @Autowired
    private LcCaseTypeStepRepository caseTypeStepRepository;

    @Autowired
    private LcCaseTypeStepItemRepository caseTypeStepItemRepository;

    @PostMapping("/list")
    public WebResp<LcCaseType, Long> list(@RequestBody WebReq<LcCaseType, Long> req) throws ClassNotFoundException {
        Page<LcCaseType> result = caseTypeRepository.findAll(req.specification(), req.pageable());
        return WebResp.newInstance().rows(result.getContent()).pages(result.getTotalPages()).total(result.getTotalElements());
    }

    @PostMapping("/save")
    @Transactional
    public WebResp<LcCaseType, Long> save(@RequestBody WebReq<LcCaseType, String> req) {
        Assert.notNull(req.getEntity(), "数据输入不完整");

        LcCaseType caseType;
        if (req.getEntity().getId() != null) {
            caseType = caseTypeRepository.getReferenceById(req.getEntity().getId());
            List<Long> ids = req.getEntity().getCaseTypeSteps().stream().filter(item -> item.getId() != null).map(item -> item.getId()).toList();
            caseTypeStepRepository.deleteByCaseTypeAndIdNotIn(caseType, ids);
        } else {
            caseType = new LcCaseType();
        }

        MyBeanUtils.copyNonNullProperties(req.getEntity(), caseType);
        caseTypeRepository.save(caseType);

        List<LcCaseTypeStep> cts = CollectionUtils.isEmpty(req.getEntity().getCaseTypeSteps()) ? new ArrayList<>() : req.getEntity().getCaseTypeSteps().stream().map(entity -> {
            entity.setCaseType(caseType);
            return entity;
        }).toList();
        caseTypeStepRepository.saveAll(cts);

        List<LcCaseTypeStepItem> items = CollectionUtils.isEmpty(cts) ?
                new ArrayList<>() :
                cts.stream().collect(() -> new ArrayList<>(),
                        (theList, item) -> theList.addAll(item.getCaseTypeStepItems().stream().map(o -> {
                            o.setCaseTypeStep(item);
                            return o;
                        }).toList()),
                        (list1, list2) -> {
                            list1.addAll(list2);
                        }
                );
        List<Long> itemIds = items.stream().filter(stepItem -> stepItem.getId() != null).map(stepItem -> stepItem.getId()).toList();
        if(itemIds != null && itemIds.size() > 0) {
            caseTypeStepItemRepository.deleteAllByCaseTypeStepInAndIdNotIn(cts, itemIds);
        } else {
            caseTypeStepItemRepository.deleteAllByCaseTypeStepIn(cts);
        }
        caseTypeStepItemRepository.saveAll(items);

        return WebResp.newInstance().msg("操作成功");
    }

    @PostMapping("/remove")
    public WebResp<LcCaseType, Long> remove(@RequestBody WebReq<LcCaseType, Long> req) throws ClassNotFoundException {
        Assert.notNull(req.getEntity(), "参数不完整");
        Assert.notNull(req.getEntity().getId(), "参数不完整");
        caseTypeRepository.deleteById(req.getEntity().getId());
        return WebResp.newInstance().subMsg("操作成功");
    }
}
