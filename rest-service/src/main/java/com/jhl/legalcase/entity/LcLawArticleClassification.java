package com.jhl.legalcase.entity;

import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.Table;

@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "lc_law_article_classification")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class LcLawArticleClassification extends JpaAudit {
    private String name;
}
