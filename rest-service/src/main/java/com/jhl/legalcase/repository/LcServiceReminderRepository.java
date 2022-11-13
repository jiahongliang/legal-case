package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.LcServiceReminder;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

public interface LcServiceReminderRepository extends JpaRepositoryImplementation<LcServiceReminder, Long> {
    List<LcServiceReminder> findAllByAttachmentId(Long attachmentId);
}
