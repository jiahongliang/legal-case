package com.jhl.legalcase.util.common;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.RandomUtil;
import cn.hutool.core.util.StrUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.PropertyAccessor;
import org.springframework.beans.PropertyAccessorFactory;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

public class ObjUtil extends ObjectUtil {
    /**
     * 对象排序
     *
     * @param clazz
     * @param list
     * @param orderBy
     * @param <T>
     */
    public static <T> void OrderBy(Class<T> clazz, List<T> list, String orderBy) {
        if (StringUtils.isNotBlank(orderBy) && !"string".equals(orderBy)) {
            String[] arr = orderBy.split("\\s+");
            String fieldValue = arr[0];
            boolean isDesc = "desc".equals(arr[1].toLowerCase());
            String fieldType = "Number";
            try {
                Field field = clazz.getDeclaredField(fieldValue);
                if (field.getType().getTypeName().contains("String")) {
                    fieldType = "String";
                } else if (field.getType().getTypeName().contains("Date")) {
                    fieldType = "Date";
                }
            } catch (NoSuchFieldException e) {
                e.printStackTrace();
            }
            if ("String".equals(fieldType)) { //Collections.sort
                list.sort(Comparator.comparing(o -> {
                    return String.valueOf(ObjUtil.GetPropertyValue(o, fieldValue));
                }));
            } else if ("Date".equals(fieldType)) {
                list.sort(Comparator.comparing(o -> {
                    return String.valueOf(ObjUtil.GetPropertyValue(o, fieldValue));
                }));
            } else {
                list.sort(Comparator.comparingDouble(o -> {
                    return Double.valueOf(ObjUtil.GetPropertyValue(o, fieldValue).toString());
                }));
            }
            if (isDesc) {
                Collections.reverse(list);
            }
        }
    }

    /**
     * 对象拷贝
     *
     * @param obj
     * @param objNew
     */
    public static void Copy(Object obj, Object objNew) {
        BeanUtils.copyProperties(obj, objNew);
    }

    /**
     * 对象属性值操作
     *
     * @param obj
     * @param propertyName
     * @return
     */
    public static Object GetPropertyValue(Object obj, String propertyName) {
        PropertyAccessor propertyAccessor = PropertyAccessorFactory.forBeanPropertyAccess(obj);
        Boolean sign = propertyAccessor.isReadableProperty(propertyName);
        if (!sign) {
            return null;
        }
        return propertyAccessor.getPropertyValue(propertyName);
    }

    public static void setPropertyValue(Object obj, String propertyName, Object propertyValue) {
        PropertyAccessor propertyAccessor = PropertyAccessorFactory.forBeanPropertyAccess(obj);
        if (propertyAccessor.isReadableProperty(propertyName)) {
            propertyAccessor.setPropertyValue(propertyName, propertyValue);
        }
    }

    private static Object getObj(Object obj, String typeName) {
        Object result = obj;
        if (typeName.contains("Float")) {
            result = Convert.toFloat(obj);
        } else if (typeName.contains("Long")) {
            result = Convert.toLong(obj);
        } else if (typeName.contains("Date")) {
            try {
                result = DateUtil.parse(String.valueOf(obj), "yyyy-MM-dd HH:mm:ss");
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        return result;
    }

    // region 对象递归查询
    public static <T> List<T> GetChildren(Class<T> clazz, List<T> list, List<String> pids) {
        List<T> result = new ArrayList<>();
        for (String pid : pids) {
            result.addAll(GetChildren(clazz, list, pid));
        }
        return result;
    }

    public static <T> List<T> GetChildren(Class<T> clazz, List<T> list, String pid) {
        List<T> result = new ArrayList<>();
        for (T t : list) {
            String curId = String.valueOf(ObjUtil.GetPropertyValue(t, "id"));
            String curPid = String.valueOf(ObjUtil.GetPropertyValue(t, "pid"));
            if (pid.equals(curPid)) {
                result.add(t);
                result.addAll(GetChildren(clazz, list, curId));
            }
        }
        return result;
    }
    // endregion

    //region 对象->Map - 根据指定条件
    public static LinkedHashMap<String, Object> GetPropertyValues(Object obj, List<String> propertyNames) {
        return GetPropertyValues(obj, propertyNames, new HashMap<>());
    }

    public static LinkedHashMap<String, Object> GetPropertyValues(Object obj, List<String> propertyNames, Map<String, List<String>> format) {
        LinkedHashMap<String, Object> result = new LinkedHashMap<>();
        if (obj.getClass().getTypeName().contains("HashMap")) {
            Map map = (HashMap) obj;
            for (String o : propertyNames) {
                Object value = null;
                if (map.containsKey(o)) {
                    value = map.get(o);
                    if (value != null && format.containsKey("date") && format.get("date").contains(o)) {
                        try {
                            LocalDateTime time = LocalDateTime.parse(String.valueOf(value), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                            value = time.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                        } catch (Exception e) {
                            System.out.println("生成excel 日期格式错误 - " + o);
                        }
                    }
                }
                result.put(o, value);
            }
        } else {
            PropertyAccessor propertyAccessor = PropertyAccessorFactory.forBeanPropertyAccess(obj);
            for (String o : propertyNames) {
                Object value = null;
                if (propertyAccessor.isReadableProperty(o)) {
                    value = propertyAccessor.getPropertyValue(o);
                }
                result.put(o, value);
            }
        }
        return result;
    }
    // endregion

    //region 对象<->Json
    private static <T> T JsonObj2JavaObj(Class<T> clazz, JSONObject o) {
        T t = null;

        try {
            t = clazz.newInstance();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        PropertyAccessor propertyAccessor = PropertyAccessorFactory.forBeanPropertyAccess(t);
        if (ObjectUtil.isNotNull(o) && !o.isEmpty()) {
            Iterator<String> iter = o.keySet().iterator();
            while (iter.hasNext()) {
                Object key = iter.next();
                String property = String.valueOf(key);
                Object value = o.get(key);
                if (propertyAccessor.isWritableProperty(property)) {
                    propertyAccessor.setPropertyValue(property, value);
                }
            }
        }
        return t;
    }

    private static <T> JSONObject JavaObj2JsonObj(T t) {
        JSONObject o = new JSONObject();
        PropertyAccessor propertyAccessor = PropertyAccessorFactory.forBeanPropertyAccess(t);
        Field[] fields = t.getClass().getDeclaredFields();
        for (Field field : fields) {
            String fieldName = field.getName();
            if (propertyAccessor.isWritableProperty(fieldName)) {
                o.put(fieldName, propertyAccessor.getPropertyValue(fieldName));
            }
        }
        return o;
    }

    public static List<JSONObject> Map2JsonObjList(List<Map<String, Object>> maps, Boolean isCamel, Boolean isLowerCase) {
        List<JSONObject> list = new LinkedList<>();
        if (isCamel) {
            for (Map<String, Object> map : maps) {
                JSONObject obj = new JSONObject();
                for (String key : map.keySet()) {
                    if (isLowerCase) {
                        obj.put(StrUtil.toCamelCase(key.toLowerCase()), map.get(key));
                    } else {
                        obj.put(StrUtil.toCamelCase(key), map.get(key));
                    }
                }
                list.add(obj);
            }

        } else {
            String jsonStr = JSONObject.toJSONString(maps);
            JSONArray arr = JSONArray.parseArray(jsonStr);
            list = arr.stream().map(o -> (JSONObject) o).collect(Collectors.toList());
        }
        return list;
    }

    public static List<JSONObject> Map2JsonObjList(List<Map<String, Object>> maps, Boolean isCamel) {
        List<JSONObject> list = new LinkedList<>();
        if (isCamel) {
            for (Map<String, Object> map : maps) {
                JSONObject obj = new JSONObject();
                for (String key : map.keySet()) {
                    obj.put(StrUtil.toCamelCase(key), map.get(key));
                }
                list.add(obj);
            }

        } else {
            String jsonStr = JSONObject.toJSONString(maps);
            JSONArray arr = JSONArray.parseArray(jsonStr);
            list = arr.stream().map(o -> (JSONObject) o).collect(Collectors.toList());
        }
        return list;
    }
    //endregion

    // region 对象格式转换
    public static <T> T Convert(Class<T> clazz, Object value) {
        return ObjUtil.Convert(clazz, value, null);
    }


    public static <T> T Convert(Class<T> clazz, Object value, T defaultValue) {
        if (value.getClass() == JSONObject.class) {
            return ObjUtil.JsonObj2JavaObj(clazz, (JSONObject) value);
        }
        if (clazz.getTypeName().equals(JSONObject.class.getTypeName())) {
            return (T) ObjUtil.JavaObj2JsonObj(value);
        }
        return cn.hutool.core.convert.Convert.convert(clazz, value, defaultValue);
    }
    // endregion

    // region 模拟数据
    public static String setObjData(Object obj, Class idClass) {
        List<String> ids = Arrays.asList("");
        PropertyAccessor pa = PropertyAccessorFactory.forBeanPropertyAccess(obj);
        HashMap<String, Field> map = new HashMap<>();

        Class<?> clazz = obj.getClass();
        for (; clazz != Object.class; clazz = clazz.getSuperclass()) {
            for (Field field : clazz.getDeclaredFields()) {
                map.put(field.getName(), field);
            }
        }
        map.forEach((o, o2) -> {
            if (!pa.isReadableProperty(o)) {
                return;
            }
            String propertyName = o2.getType().getName();
            switch (propertyName) {
                case "java.lang.String":
                    if (idClass != null && o2.getAnnotation(idClass) != null) {
                        String id = UUID.randomUUID().toString();
                        ids.set(0, id);
                        pa.setPropertyValue(o, UUID.randomUUID().toString());
                    } else {
                        pa.setPropertyValue(o, "普通文本");
                    }
                    break;
                case "java.util.Date":
                    pa.setPropertyValue(o, new Date());
                    break;
                case "java.lang.Long":
                case "java.lang.Double":
                case "java.lang.Intger":
                    pa.setPropertyValue(o, RandomUtil.randomInt(0, 100));
                    break;
                default:
            }
        });
        return ids.get(0);
    }
    // endregion

    public static void main(String[] args) throws Exception {
        Class01 classNew = new Class01();

        String id = ObjUtil.setObjData(classNew, null);


        String jsonStr = "{\"searchCondition\":\"包含\",\"value1\":\"xiangMjmc\",\"value2\":\"3\",\"value3\":\"\"}";
        JSONObject obj = JSON.parseObject(jsonStr);

        List<Class01> list = new ArrayList<>();
        list.add(new Class01("01", "0"));
        list.add(new Class01("02", "0"));
        list.add(new Class01("001", "01"));
        list.add(new Class01("11", "1"));
        List<Class01> listChildren = ObjUtil.GetChildren(Class01.class, list, Arrays.asList("0", "1"));

        String[] arr = "1,2".split(",");
        Integer[] arr2 = Convert(Integer[].class, arr);
        Date date = cn.hutool.core.convert.Convert.convert(Date.class, "2018-09-05 00:07:08");
        JSONObject obj01 = new JSONObject();
        obj01.put("a", "1");
        Class01 class01 = new Class01();
        class01.setA("1");
        Method method = Class01.class.getMethod("opt1", String.class);
        Object v = method.invoke(Class01.class.newInstance(), "111");
    }

    public static class Class01 {
        public Class01() {
        }

        public Class01(String... arr) {
            id = arr[0];
            pid = arr[1];
        }

        private String a;
        private String b;
        private String id;
        private String pid;

        public String getA() {
            return a;
        }

        public void setA(String a) {
            this.a = a;
        }

        public String getB() {
            return b;
        }

        public void setB(String b) {
            this.b = b;
        }

        public String opt(String a) {
            return a;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getPid() {
            return pid;
        }

        public void setPid(String pid) {
            this.pid = pid;
        }
    }
}
