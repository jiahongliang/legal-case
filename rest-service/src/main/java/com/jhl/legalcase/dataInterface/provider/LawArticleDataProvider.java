package com.jhl.legalcase.dataInterface.provider;

import com.jhl.legalcase.dataInterface.provider.support.BaseDataProvider;
import com.jhl.legalcase.entity.LcLawArticle;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@ConditionalOnExpression("'${legalCase.dataInterface.role}'.equals('provider')")
@Slf4j
@RestController
@RequestMapping(value = "/data-interface/provider/law-article")
public class LawArticleDataProvider extends BaseDataProvider<LcLawArticle> {

}
