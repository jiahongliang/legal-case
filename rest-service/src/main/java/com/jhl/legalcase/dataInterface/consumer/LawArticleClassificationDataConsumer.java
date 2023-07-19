package com.jhl.legalcase.dataInterface.consumer;

import com.jhl.legalcase.dataInterface.consumer.support.BaseDataConsumer;
import com.jhl.legalcase.entity.LcLawArticleClassification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.stereotype.Component;

@ConditionalOnExpression("'${legalCase.dataInterface.role}'.equals('consumer')")
@Component
@Slf4j
public class LawArticleClassificationDataConsumer extends BaseDataConsumer<LcLawArticleClassification> {

}
