package com.jhl.legalcase.util.common;

import cn.hutool.core.util.ReflectUtil;
import cn.hutool.core.util.StrUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

import java.util.*;

public class MyBeanUtils {
    public static void copyNonNullProperties(Object source, Object target) {
        BeanUtils.copyProperties(source, target, getNullPropertyNames(source));
    }

    private static String[] getNullPropertyNames(Object source) {
        String setNullProperty = String.valueOf(ReflectUtil.getFieldValue(source, "setNullProperty"));
        if (StrUtil.isBlank(setNullProperty)) {
            return new String[0];
        }
        List<String> ignoreList = new ArrayList<>();
        if (!"null".equals(setNullProperty)) {
            ignoreList = Arrays.asList(setNullProperty.split(","));
        }
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();
        Set<String> emptyNames = new HashSet<String>();
        for (java.beans.PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null && !ignoreList.contains(pd.getName())) {
                emptyNames.add(pd.getName());
            }
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }
}
