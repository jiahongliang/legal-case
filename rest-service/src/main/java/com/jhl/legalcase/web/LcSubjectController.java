package com.jhl.legalcase.web;

import com.jhl.legalcase.entity.LcSubject;
import com.jhl.legalcase.entity.LcSubjectItem;
import com.jhl.legalcase.repository.LcSubjectItemRepository;
import com.jhl.legalcase.repository.LcSubjectRepository;
import com.jhl.legalcase.util.pinyin.PinyinUtil;
import com.jhl.legalcase.util.webmsg.WebReq;
import com.jhl.legalcase.util.webmsg.WebResp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * @author
 */
@Slf4j
@RestController
@RequestMapping(value = "subject")
public class LcSubjectController {
    @Autowired
    private LcSubjectRepository subjectRepository;

    @Autowired
    private LcSubjectItemRepository subjectItemRepository;

    @GetMapping("/tree")
    public WebResp<LcSubject, Long> list() throws ClassNotFoundException {
        List<LcSubject> lst = subjectRepository.findAllByParentIsNull();
        return WebResp.newInstance().rows(lst).pages(0).total(lst.size());
    }

    @PostMapping("/item-list")
    public WebResp<LcSubjectItem, Long> itemList(@RequestBody WebReq<LcSubjectItem, Long> req) throws ClassNotFoundException {
        Page<LcSubjectItem> result = subjectItemRepository.findAll(req.specification(), req.pageable());
        return WebResp.newInstance().rows(result.getContent()).pages(result.getTotalPages()).total(result.getTotalElements());
    }

    @PostMapping("/save")
    @Transactional
    public WebResp<LcSubject, Long> save(@RequestBody WebReq<LcSubject, String> req) {
        Assert.notNull(req.getEntity(), "数据输入不完整");
        LcSubject dest = req.getEntity();
        if (req.getEntity().getParent() != null && req.getEntity().getParent().getId() != null) {
            dest.setParent(subjectRepository.getReferenceById(req.getEntity().getParent().getId()));
        } else {
            dest.setParent(null);
        }
        if (StringUtils.hasLength(dest.getName())) {
            dest.setNameSearch(dest.getName() + "|" + PinyinUtil.toFirstChar(dest.getName()));
        }
        subjectRepository.save(dest);
        return WebResp.newInstance().rows(Arrays.asList(dest));
    }

    @PostMapping("/save-item")
    @Transactional
    public WebResp<LcSubjectItem, Long> saveItem(@RequestBody WebReq<LcSubjectItem, String> req) {
        Assert.notNull(req.getEntity(), "数据输入不完整");
        subjectItemRepository.save(req.getEntity());
        return WebResp.newInstance().rows(Arrays.asList(req.getEntity()));
    }

    @PostMapping("/remove")
    public WebResp<LcSubject, Long> remove(@RequestBody WebReq<LcSubject, Long> req) throws ClassNotFoundException {
        Assert.notNull(req.getEntity(), "参数不完整");
        Assert.notNull(req.getEntity().getId(), "参数不完整");
        subjectRepository.deleteById(req.getEntity().getId());
        subjectItemRepository.deleteAllBySubjectId(req.getEntity().getId());
        return WebResp.newInstance().subMsg("操作成功");
    }

    @PostMapping("/remove-item")
    public WebResp<LcSubjectItem, Long> removeItem(@RequestBody WebReq<LcSubjectItem, Long> req) throws ClassNotFoundException {
        Assert.notNull(req.getEntity(), "参数不完整");
        Assert.notNull(req.getEntity().getId(), "参数不完整");
        subjectItemRepository.deleteById(req.getEntity().getId());
        return WebResp.newInstance().subMsg("操作成功");
    }
}
