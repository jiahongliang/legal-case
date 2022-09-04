package com.jhl.legalcase.repository;

import com.jhl.legalcase.entity.SysUser;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

public interface SysUserRepository extends JpaRepositoryImplementation<SysUser, Long> {
    /**
     * 根据手机号查找用户
     *
     * @param mobile
     * @return
     */
    SysUser findFirstByMobile(String mobile);

    /**
     * 根据手机号码，并排除id查询
     *
     * @param mobile
     * @return
     */
    List<SysUser> findAllByMobileAndIdNot(String mobile, Long id);

    /**
     * 查找符合条件记录
     *
     * @return
     */
    List<SysUser> findAllByNameSearchIsNull();
}
