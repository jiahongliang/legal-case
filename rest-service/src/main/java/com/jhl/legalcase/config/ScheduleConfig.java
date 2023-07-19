package com.jhl.legalcase.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

@ConditionalOnExpression("'${legalCase.dataInterface.role}'.equals('consumer')")
@Configuration
@EnableScheduling
public class ScheduleConfig {
    @Bean
    RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
