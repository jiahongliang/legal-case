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
@Table(name = "sys_menu_order")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class SysMenuOrder extends JpaAudit {

    private Long userId;

    private String menuKey;

    private Integer sort;
}
