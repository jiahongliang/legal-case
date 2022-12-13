package com.jhl.legalcase.listener;

import com.jhl.legalcase.repository.LcCaseTypeStepRepository;
import com.jhl.legalcase.repository.LcSubjectRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class OrderValueHandle implements CommandLineRunner {
    @Autowired
    LcSubjectRepository lcSubjectRepository;

    @Autowired
    LcCaseTypeStepRepository lcCaseTypeStepRepository;

    @Override
    public void run(String... args) throws Exception {
        lcSubjectRepository.initializeOrderValue();
        lcCaseTypeStepRepository.initializeIndexValue();
        log.info("序号初始化完毕!");
    }
}
