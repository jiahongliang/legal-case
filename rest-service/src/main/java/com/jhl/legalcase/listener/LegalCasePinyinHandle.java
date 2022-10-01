package com.jhl.legalcase.listener;

import com.jhl.legalcase.entity.*;
import com.jhl.legalcase.repository.*;
import com.jhl.legalcase.util.pinyin.PinyinUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.List;

@Component
public class LegalCasePinyinHandle implements CommandLineRunner {
    @Autowired
    LcSubjectRepository subjectRepository;

    @Autowired
    LcCaseTypeRepository caseTypeRepository;

    @Autowired
    LcCaseExecutionRepository caseExecutionRepository;

    @Autowired
    LcLawArticleRepository lcLawArticleRepository;

    @Autowired
    SysLoginLogRepository loginLogRepository;

    @Autowired
    SysUserRepository userRepository;

    @Autowired
    private LcCaseTypeStepRepository caseTypeStepRepository;

    /**
     * Callback used to run the bean.
     *
     * @param args incoming main method arguments
     * @throws Exception on error
     */
   // @Override
    public void run(String... args) throws Exception {
        //1、检查用户表
        List<SysUser> users = userRepository.findAllByNameSearchIsNull();
        if (!CollectionUtils.isEmpty(users)) {
            users.forEach(user -> {
                if (StringUtils.hasLength(user.getName())) {
                    user.setNameSearch(user.getName() + "|" + PinyinUtil.toFirstChar(user.getName()));
                }
            });
            userRepository.saveAll(users);
        }

        //2、检查登录信息表
        List<SysLoginLog> logs = loginLogRepository.findAllByNameSearchIsNull();
        if (!CollectionUtils.isEmpty(logs)) {
            logs.forEach(log -> {
                if (StringUtils.hasLength(log.getName())) {
                    log.setNameSearch(log.getName() + "|" + PinyinUtil.toFirstChar(log.getName()));
                }
            });
            loginLogRepository.saveAll(logs);
        }

        //3、lawArticle
        List<LcLawArticle> articles = lcLawArticleRepository.findAllByTitleSearchIsNull();
        if (!CollectionUtils.isEmpty(articles)) {
            articles.forEach(article -> {
                if (StringUtils.hasLength(article.getTitle())) {
                    article.setTitleSearch(article.getTitle() + "|" + PinyinUtil.toFirstChar(article.getTitle()));
                }
            });
            lcLawArticleRepository.saveAll(articles);
        }

        //4、 CaseExecution
        List<LcCaseExecution> executions = caseExecutionRepository.findAllByNameSearchIsNull();
        if (!CollectionUtils.isEmpty(executions)) {
            executions.forEach(execution -> {
                if (StringUtils.hasLength(execution.getName())) {
                    execution.setNameSearch(execution.getName() + "|" + PinyinUtil.toFirstChar(execution.getName()));
                }
            });
            caseExecutionRepository.saveAll(executions);
        }

        //5、 CaseType
        List<LcCaseType> types = caseTypeRepository.findAllByNameSearchIsNull();
        if (!CollectionUtils.isEmpty(types)) {
            types.forEach(type -> {
                if (StringUtils.hasLength(type.getName())) {
                    type.setNameSearch(type.getName() + "|" + PinyinUtil.toFirstChar(type.getName()));
                }
            });
            caseTypeRepository.saveAll(types);
        }

        //6、LcSubject
        List<LcSubject> subjects = subjectRepository.findAllByNameSearchIsNull();
        if (!CollectionUtils.isEmpty(subjects)) {
            subjects.forEach(subject -> {
                if (StringUtils.hasLength(subject.getName())) {
                    subject.setNameSearch(subject.getName() + "|" + PinyinUtil.toFirstChar(subject.getName()));
                }
            });
            subjectRepository.saveAll(subjects);
        }

        //7、LcCaseTypeStep
        List<LcCaseTypeStep> steps = caseTypeStepRepository.findAllByNameSearchIsNull();
        if(!CollectionUtils.isEmpty(steps)) {
            steps.forEach(step -> {
                if(StringUtils.hasLength(step.getName())) {
                    step.setNameSearch(step.getName() + "|" + PinyinUtil.toFirstChar(step.getName()));
                }
            });
            caseTypeStepRepository.saveAll(steps);
        }

        System.out.println("系统启动时运行，初始化拼音完毕...");
    }
}
