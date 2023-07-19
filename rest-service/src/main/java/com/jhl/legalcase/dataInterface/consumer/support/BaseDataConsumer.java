package com.jhl.legalcase.dataInterface.consumer.support;

import com.jhl.legalcase.LegalCaseApplication;
import com.jhl.legalcase.dataInterface.repository.DataProviderRepository;
import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.util.CollectionUtils;

import javax.annotation.PostConstruct;
import java.lang.reflect.ParameterizedType;
import java.util.Date;
import java.util.List;

@Slf4j
public class BaseDataConsumer<T extends JpaAudit> {

    DataProviderRepository<T> dataProviderRepository = null;

    protected Class<T> clazz;

    private String repositoryBeanName;

    @Autowired
    ConsumerService consumerService;

    @PostConstruct
    void init() {
        Class<?> clazz = this.getClass();
        if (clazz.getSuperclass() != BaseDataConsumer.class) {
            clazz = clazz.getSuperclass();
        }
        ParameterizedType type = (ParameterizedType) clazz.getGenericSuperclass();
        this.clazz = (Class) type.getActualTypeArguments()[0];
        this.repositoryBeanName = StringUtils.uncapitalize(this.clazz.getSimpleName()) + "Repository";
    }

    @Scheduled(fixedRate = 3600000)
    //@Scheduled(fixedRate = 2000)
    public void consumeData() {
        log.info("开始同步{}数据...", this.clazz.getSimpleName());
        dataProviderRepository = (DataProviderRepository) LegalCaseApplication.applicationContext.getBean(repositoryBeanName);
        T latest = dataProviderRepository.findFirstByIdIsNotNullOrderByCreatedTimeDesc();
        Date latestTime = null;
        if (latest != null) {
            latestTime = latest.getCreatedTime();
        }
        List<T> data = consumerService.fetchData(latestTime, this.clazz.getSimpleName());
        if (!CollectionUtils.isEmpty(data)) {
            dataProviderRepository.saveAll(data);
        }

        log.info("同步{}数据完成，共同步了{}条数据...", this.clazz.getSimpleName(), data == null ? 0 : data.size());
    }
}
