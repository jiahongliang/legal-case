package com.jhl.legalcase.dataInterface.consumer;

import com.jhl.legalcase.LegalCaseApplication;
import com.jhl.legalcase.dataInterface.consumer.support.BaseDataConsumer;
import com.jhl.legalcase.dataInterface.repository.DataProviderRepository;
import com.jhl.legalcase.entity.LcLawArticle;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.Date;
import java.util.List;

@ConditionalOnExpression("'${legalCase.dataInterface.role}'.equals('consumer')")
@Component
@Slf4j
public class LawArticleDataConsumer extends BaseDataConsumer<LcLawArticle> {
}
