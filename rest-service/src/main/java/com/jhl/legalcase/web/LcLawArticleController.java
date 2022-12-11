package com.jhl.legalcase.web;

import com.jhl.legalcase.entity.LcLawArticle;
import com.jhl.legalcase.entity.LcLawArticleClassification;
import com.jhl.legalcase.repository.LcLawArticleClassificationRepository;
import com.jhl.legalcase.repository.LcLawArticleRepository;
import com.jhl.legalcase.util.pinyin.PinyinUtil;
import com.jhl.legalcase.util.webmsg.WebReq;
import com.jhl.legalcase.util.webmsg.WebResp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

/**
 * @author
 */
@Slf4j
@RestController
@RequestMapping(value = "law-article")
public class LcLawArticleController {

    @Autowired
    private LcLawArticleRepository lawArticleRepository;

    @Autowired
    private LcLawArticleClassificationRepository lcLawArticleClassificationRepository;

    @GetMapping("/classification-list")
    public WebResp<LcLawArticleClassification, Long> classificationList() throws ClassNotFoundException {
        List<LcLawArticleClassification> all = lcLawArticleClassificationRepository.findAll();
        return WebResp.newInstance().rows(all);
    }

    @GetMapping("/add-classification/{name}")
    public WebResp<LcLawArticleClassification, Long> addClassification(@PathVariable("name") String name) throws ClassNotFoundException {
        List<LcLawArticleClassification> list = lcLawArticleClassificationRepository.findAllByName(name);
        if (CollectionUtils.isEmpty(list)) {
            LcLawArticleClassification lcLawArticleClassification = LcLawArticleClassification.builder().name(name).build();
            lcLawArticleClassificationRepository.save(lcLawArticleClassification);
        }

        List<LcLawArticleClassification> all = lcLawArticleClassificationRepository.findAll();
        return WebResp.newInstance().rows(all);
    }

    @PostMapping("/list")
    public WebResp<LcLawArticle, Long> itemList(@RequestBody WebReq<LcLawArticle, Long> req) throws ClassNotFoundException {
        Page<LcLawArticle> result = lawArticleRepository.findAll(req.specification(), req.pageable());
        return WebResp.newInstance().rows(result.getContent()).pages(result.getTotalPages()).total(result.getTotalElements());
    }

    @PostMapping("/save")
    @Transactional
    public WebResp<LcLawArticle, Long> save(@RequestBody WebReq<LcLawArticle, String> req) {
        Assert.notNull(req.getEntity(), "数据输入不完整");
        LcLawArticle entity = req.getEntity();
        if (StringUtils.hasLength(entity.getTitle())) {
            entity.setTitleSearch(entity.getTitle() + "|" + PinyinUtil.toFirstChar(entity.getTitle()));
        }
        LcLawArticle article = lawArticleRepository.save(entity);
        return WebResp.newInstance().rows(Arrays.asList(article));
    }

    @PostMapping("/remove")
    @Transactional
    public WebResp<LcLawArticle, Long> remove(@RequestBody WebReq<LcLawArticle, String> req) {
        Assert.notNull(req.getEntity(), "数据输入不完整");
        Assert.notNull(req.getEntity().getId(), "数据输入不完整");
        lawArticleRepository.deleteById(req.getEntity().getId());
        return WebResp.newInstance();
    }
}
