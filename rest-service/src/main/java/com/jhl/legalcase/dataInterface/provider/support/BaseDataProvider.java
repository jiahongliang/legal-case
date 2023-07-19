package com.jhl.legalcase.dataInterface.provider.support;

import com.jhl.legalcase.LegalCaseApplication;
import com.jhl.legalcase.dataInterface.repository.DataProviderRepository;
import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.annotation.PostConstruct;
import java.lang.reflect.ParameterizedType;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Slf4j
public class BaseDataProvider<E extends JpaAudit> {

    DataProviderRepository<E> dataProviderRepository = null;

    protected Class<E> clazz;

    private String repositoryBeanName;

    @PostConstruct
    void init() {
        Class<?> clazz = this.getClass();
        if (clazz.getSuperclass() != BaseDataProvider.class) {
            clazz = clazz.getSuperclass();
        }
        ParameterizedType type = (ParameterizedType) clazz.getGenericSuperclass();
        this.clazz = (Class) type.getActualTypeArguments()[0];
        this.repositoryBeanName = StringUtils.uncapitalize(this.clazz.getSimpleName()) + "Repository";
    }

    @GetMapping("/{milliseconds}")
    public List<E> list(@PathVariable("milliseconds") Long milliseconds) {
        List<E> result = Collections.emptyList();
        Date datetime = null;
        Calendar c = Calendar.getInstance();
        if (milliseconds == null) {
            c.setTimeInMillis(1000);
            datetime = c.getTime();
        } else {
            c.setTimeInMillis(milliseconds);
            datetime = c.getTime();
        }
        dataProviderRepository = (DataProviderRepository) LegalCaseApplication.applicationContext.getBean(repositoryBeanName);
        result = dataProviderRepository.findTop1000ByLastmodifiedTimeAfterOrderByCreatedTimeAsc(datetime);
        return result;
    }
}
