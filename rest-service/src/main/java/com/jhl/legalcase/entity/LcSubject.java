package com.jhl.legalcase.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author
 */
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "lc_subject")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class LcSubject extends JpaAudit {

    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "parent")
    private List<LcSubject> children = new ArrayList<>();

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private LcSubject parent;

}
