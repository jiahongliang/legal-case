package com.jhl.legalcase.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jhl.legalcase.util.jpa.JpaAudit;
import lombok.*;

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
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LcSubject extends JpaAudit {

    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "parent")
    private List<LcSubject> children = new ArrayList<>();

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private LcSubject parent;

}
