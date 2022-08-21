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
@Table(name = "lc_law_article")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class LcLawArticle extends JpaAudit {
    private Integer orderValue;
    private String title;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "content", columnDefinition = "Text")
    private String content;

    private Long attachmentId;
    private String attachmentName;
}
