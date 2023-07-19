package com.jhl.legalcase.dataInterface.consumer.support;

import com.jhl.legalcase.dataInterface.consumer.support.ProvidedTypeReference;
import com.jhl.legalcase.dataInterface.provider.support.BaseDataProvider;
import com.jhl.legalcase.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.lang.reflect.ParameterizedType;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@ConditionalOnExpression("'${legalCase.dataInterface.role}'.equals('consumer')")
@Component
public class ConsumerService {
    @Autowired
    RestTemplate restTemplate;

    @Value("${legalCase.dataInterface.url}")
    String remoteUrl;

    private <T> T getRequest(String urlMatcher, Date datetime) {
        Long milliseconds = 1000L;
        if (datetime != null) {
            milliseconds = datetime.getTime();
        }
        String url = remoteUrl + urlMatcher + "/" + milliseconds;
        ParameterizedTypeReference<T> typeReference = ProvidedTypeReference.getTypeReference();
        T t = restTemplate.exchange(url, HttpMethod.GET, null, typeReference).getBody();
        return t;
    }

    public <E> List<E> fetchData(Date datetime,String className) {
        List<E> result = null;
        switch (className) {
            case "LcLawArticle":
                result = getRequest("law-article", datetime);;
                break;
            case "LcLawArticleClassification":
                result = getRequest("law-article-classification", datetime);
                break;
            case "LcServiceReminder":
                result = getRequest("service-reminder", datetime);
                break;
            case "LcSubject":
                result = getRequest("subject", datetime);
                break;
            case "LcSubjectItem":
                result = getRequest("subject-item", datetime);
                break;
            default:
                result = Collections.emptyList();
        }
        return result;
    }

    public List<LcLawArticle> fetchLawArticle(Date datetime) {
        return getRequest("law-article", datetime);
    }

    public List<LcLawArticleClassification> fetchLawArticleClassification(Date datetime) {
        return getRequest("law-article-classification", datetime);
    }

    public List<LcServiceReminder> fetchServiceReminder(Date datetime) {
        return getRequest("service-reminder", datetime);
    }

    public List<LcSubject> fetchSubject(Date datetime) {
        return getRequest("subject", datetime);
    }

    public List<LcSubjectItem> fetchSubjectItem(Date datetime) {
        return getRequest("subject-item", datetime);
    }
}
