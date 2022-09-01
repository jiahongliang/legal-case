package com.jhl.legalcase.entity;

import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

/**
 * @author
 */
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "lc_subject_item")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class LcSubjectItem extends JpaAudit {

    private Long subjectId;
    private String name;
    private String lawTitle;
    private Integer orderValue;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "law_content", columnDefinition = "Text")
    private String lawContent;

    private Long attachmentId;
    private String attachmentName;
}
