package com.jhl.legalcase.web;

import com.jhl.legalcase.entity.LcLawArticle;
import com.jhl.legalcase.entity.LcServiceReminder;
import com.jhl.legalcase.entity.SysAttachment;
import com.jhl.legalcase.repository.LcServiceReminderRepository;
import com.jhl.legalcase.repository.SysAttachmentRepository;
import com.jhl.legalcase.util.webmsg.WebReq;
import com.jhl.legalcase.util.webmsg.WebResp;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

/**
 * @author
 */
@Slf4j
@RestController
@RequestMapping(value = "service-reminder")
public class LcServiceReminderController {
    @Autowired
    LcServiceReminderRepository lcServiceReminderRepository;

    @Autowired
    SysAttachmentRepository sysAttachmentRepository;

    @PostMapping("/list")
    public WebResp<LcServiceReminder, Long> list(@RequestBody WebReq<LcServiceReminder, Long> req) throws ClassNotFoundException {
        Page<LcServiceReminder> result = lcServiceReminderRepository.findAll(req.specification(), req.pageable());
        return WebResp.newInstance().rows(result.getContent()).pages(result.getTotalPages()).total(result.getTotalElements());
    }

    @PostMapping("/save")
    @Transactional
    public WebResp<LcServiceReminder, Long> save(@RequestBody WebReq<LcServiceReminder, String> req) {
        Assert.notNull(req.getEntity().getAttachmentId(), "数据输入不完整");
        LcServiceReminder entity = req.getEntity();
        SysAttachment attachment = sysAttachmentRepository.getReferenceById(entity.getAttachmentId());
        if (attachment == null) {
            throw new ObjectNotFoundException(entity.getAttachmentId(), "文件对象不存在");
        }

        List<LcServiceReminder> list = lcServiceReminderRepository.findAllByAttachmentId(entity.getAttachmentId());
        LcServiceReminder lcServiceReminder = null;
        if (CollectionUtils.isEmpty(list)) {
            lcServiceReminder = LcServiceReminder.builder().fileName(attachment.getName()).attachmentId(attachment.getId()).build();
        } else {
            lcServiceReminder = list.get(0);
            lcServiceReminder.setAttachmentId(attachment.getId());
            lcServiceReminder.setFileName(attachment.getName());
        }
        if (lcServiceReminder != null) {
            lcServiceReminder.setOrderValue(entity.getOrderValue());
            lcServiceReminderRepository.save(lcServiceReminder);
        }
        return WebResp.newInstance().rows(Arrays.asList(lcServiceReminder));
    }

    @PostMapping("/remove")
    @Transactional
    public WebResp<LcLawArticle, Long> remove(@RequestBody WebReq<LcLawArticle, String> req) {
        Assert.notNull(req.getEntity(), "数据输入不完整");
        Assert.notNull(req.getEntity().getId(), "数据输入不完整");
        lcServiceReminderRepository.deleteById(req.getEntity().getId());
        return WebResp.newInstance();
    }
}
