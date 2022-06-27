package com.jhl.legalcase;

import cn.hutool.core.codec.Base64;
import cn.hutool.core.date.DateUnit;
import com.jhl.legalcase.service.SysUserService;
import com.jhl.legalcase.util.common.DateUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.function.Consumer;
import java.util.function.Supplier;

@SpringBootTest
class LegalCaseApplicationTests {

    @Autowired
    SysUserService userService;

    @Test
    void contextLoads() {
    }

    @Test
    void testResetPassword() {
        userService.resetPasswordById(1L);
    }

    @Test
    void testLoginString() {
        String str = "{'userName':'13000000000','password':'123456','verifyCode':'KB8A'}";
        System.out.println(Base64.encode(str));
    }

    private void a(int i) {
        assert i > 0;
        System.out.println(i);
    }

    @Test
    void testA() {
        Consumer<String> sc = System.out::println;
        sc.andThen(s -> {
            System.out.println(s.length());
        }).accept("12345");
    }
}
