package com.jhl.legalcase.dataInterface.consumer.support;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Date;
import java.util.List;

@ConditionalOnExpression("'${legalCase.dataInterface.role}'.equals('consumer')")
@Component
public class ConsumerService {
    @Autowired
    RestTemplate restTemplate;

    @Value("${legalCase.dataInterface.host}")
    String remoteHost;

    private static ObjectMapper objectMapper = new ObjectMapper();

    private <T> T getRequest(ParameterizedTypeReference<T> typeReference, String urlMatcher, Date datetime) {
        Long milliseconds = 1000L;
        if (datetime != null) {
            milliseconds = datetime.getTime();
        }
        String url = "http://" + remoteHost + "/legal-case/data-interface/provider/" + urlMatcher + "/" + milliseconds;
        T t = restTemplate.exchange(url, HttpMethod.GET, null, typeReference).getBody();
        return t;
    }

    public <T> List<T> fetchData(Date datetime, Class<T> clazz) {

        List<T> result = null;

        TypeFactory typeFactory = objectMapper.getTypeFactory();
        JavaType javaType = typeFactory.constructParametricType(List.class, clazz);
        ParameterizedTypeReference<List<T>> returnType = ParameterizedTypeReference.forType(javaType);

        switch (clazz.getSimpleName()) {
            case "LcLawArticle":
                result = getRequest(returnType, "law-article", datetime);
                break;
            case "LcLawArticleClassification":
                result = getRequest(returnType, "law-article-classification", datetime);
                break;
            case "LcServiceReminder":
                result = getRequest(returnType, "service-reminder", datetime);
                break;
            case "LcSubject":
                result = getRequest(returnType, "subject", datetime);
                break;
            case "LcSubjectItem":
                result = getRequest(returnType, "subject-item", datetime);
                break;
            default:
                result = Collections.emptyList();
        }

        return result;
    }
}
