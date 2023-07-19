package com.jhl.legalcase.repository;

import com.jhl.legalcase.dataInterface.repository.DataProviderRepository;
import com.jhl.legalcase.entity.LcServiceReminder;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

public interface LcServiceReminderRepository extends DataProviderRepository<LcServiceReminder> {
    List<LcServiceReminder> findAllByAttachmentId(Long attachmentId);
}
