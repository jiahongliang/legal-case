package com.jhl.legalcase.web;

import com.jhl.legalcase.entity.LcLawArticle;
import com.jhl.legalcase.repository.LcLawArticleRepository;
import com.jhl.legalcase.util.webmsg.WebReq;
import com.jhl.legalcase.util.webmsg.WebResp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Collections;

/**
 * @author
 */
@Slf4j
@RestController
@RequestMapping(value = "law-article")
public class LcLawArticleController {

    @Autowired
    private LcLawArticleRepository lawArticleRepository;

    @PostMapping("/list")
    public WebResp<LcLawArticle, Long> itemList(@RequestBody WebReq<LcLawArticle, Long> req) throws ClassNotFoundException {
        Page<LcLawArticle> result = lawArticleRepository.findAll(req.specification(), req.pageable());
        return WebResp.newInstance().rows(result.getContent()).pages(result.getTotalPages()).total(result.getTotalElements());
    }

    @PostMapping("/save")
    @Transactional
    public WebResp<LcLawArticle, Long> save(@RequestBody WebReq<LcLawArticle, String> req) {
        Assert.notNull(req.getEntity(), "数据输入不完整");
        LcLawArticle article = lawArticleRepository.save(req.getEntity());
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
