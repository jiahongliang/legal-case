package com.jhl.legalcase.util.webmsg;


import com.jhl.legalcase.LegalCaseConstants;
import com.jhl.legalcase.util.common.ObjUtil;
import lombok.Data;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.*;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 请求报文对象
 *
 * @param <T>
 * @param <T2>
 * @author
 */
@Data
public class WebReq<T, T2> implements Serializable {

    private T entity;

    private T2 ext;

    private List<WebQuery> where;

    private List<WebRange> range;

    private int pageNum;

    private int pageSize;

    private String orderBy = "";

    public void addWebQuery(String... arr) {
        if (where == null) {
            where = new ArrayList<>();
        }
        where.add(new WebQuery(arr[0], arr[1], arr[2], arr[3]));
    }


    public Pageable pageable() {
        if (pageSize == 0) {
            pageSize = LegalCaseConstants.DEFAULT_PAGE_SIZE;
        }
        Sort sort = Sort.unsorted();
        orderBy = orderBy.trim();
        if (orderBy.length() > 0) {
            if (orderBy.lastIndexOf(" asc") > 0) {
                sort = Sort.by(Sort.Direction.ASC, orderBy.replace(" asc", ""));
            } else if (orderBy.lastIndexOf(" desc") > 0) {
                sort = Sort.by(Sort.Direction.DESC, orderBy.replace(" desc", ""));
            } else {
                sort = Sort.by(Sort.Direction.ASC, orderBy);
            }
        }
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);
        return pageable;
    }

    public Specification<T> specification() throws ClassNotFoundException {
        Class<?> clazz = Class.forName(entity.getClass().getName());
        Field[] fields = FieldUtils.getAllFields(clazz);
        return ((root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            for (Field field : fields) {
                String fieldName = field.getName();
                Object fieldValue = ObjUtil.GetPropertyValue(entity, fieldName);
                String fieldType = field.getType().getTypeName();
                if (fieldValue != null) {
                    if (fieldType.equals("java.lang.String")) {
                        String value = (String) fieldValue;
                        if (StringUtils.hasLength(value)) {
                            predicates.add(criteriaBuilder.like(root.get(fieldName), "%" + value + "%"));
                        }
                    } else if (fieldType.equals("java.util.List")) {

                    }else {
                        predicates.add(criteriaBuilder.equal(root.get(fieldName), fieldValue));
                    }
                }
            }

            if (where != null && where.size() > 0) {
                where.forEach(webQuery -> {
                    predicates.add(buildQueryPredicate(webQuery, root, criteriaBuilder));
                });
            }

            if (range != null && range.size() > 0) {
                range.forEach(range -> {
                    predicates.add(buildRangePredicate(range, root, criteriaBuilder));
                });
            }

            Predicate[] arr = new Predicate[predicates.size()];
            criteriaQuery = criteriaQuery.where(predicates.toArray(arr));
            return criteriaBuilder.and(arr);
        });
    }

    private <E> Predicate buildQueryPredicate(WebQuery myQuery, Root<E> root, CriteriaBuilder builder) {
        Predicate predicate = null;
        String optType = convertOptType(myQuery.getOpt());
        String filed = myQuery.getField();
        Object value = myQuery.getValue();//  ObjUtil.Convert(path.getJavaType(), myQuery.getValue());
        if (myQuery.getField().trim().isEmpty() || myQuery.getField().equals("string")) {
            return builder.conjunction(); //builder.isTrue(builder.literal(true));
        }
        List<String> allFieldsList = FieldUtils.getAllFieldsList(root.getJavaType()).stream().map(Field::getName).collect(Collectors.toList());
        if (!allFieldsList.contains(filed)) {
            return null;
        }
        Expression path;
        if (filed.contains(":")) {
            String[] arr = myQuery.getField().split(":");
            String[] arr2 = arr[1].split(",");
            Expression[] arr3 = new Expression[arr2.length];
            for (int i = 0; i < arr2.length; i++) {
                arr3[i] = getPath(arr2[i], root);
            }
            path = builder.function(arr[0], value.getClass(), arr3);
        } else {
            path = getPath(filed, root);
        }
        switch (optType) {
            case "isNotNull":
                predicate = builder.isNotNull(path);
                break;
            case "isNull":
                predicate = builder.isNull(path);
                break;
            case "!=":
                predicate = builder.notEqual(path, ObjUtil.Convert(path.getJavaType(), value));
                break;
            case "!=#":
                predicate = builder.notEqual(path, getPath(myQuery.getValue(), root));
                break;
            case "=":
                predicate = builder.equal(path, ObjUtil.Convert(path.getJavaType(), value));
                break;
            case "=#":
                predicate = builder.equal(path, getPath(myQuery.getValue(), root));
                break;
            case ">":
                predicate = builder.greaterThan(path, (Comparable) ObjUtil.Convert(path.getJavaType(), value));
                break;
            case ">#":
                predicate = builder.greaterThan(path, getPath(myQuery.getValue(), root));
                break;
            case ">=":
                predicate = builder.greaterThanOrEqualTo(path, (Comparable) ObjUtil.Convert(path.getJavaType(), value));
                break;
            case ">=#":
                predicate = builder.greaterThanOrEqualTo(path, getPath(myQuery.getValue(), root));
                break;
            case "<":
                predicate = builder.lessThan(path, (Comparable) ObjUtil.Convert(path.getJavaType(), value));
                break;
            case "<#":
                predicate = builder.lessThan(path, getPath(myQuery.getValue(), root));
                break;
            case "<=":
                predicate = builder.lessThanOrEqualTo(path, (Comparable) ObjUtil.Convert(path.getJavaType(), value));
                break;
            case "<=#":
                predicate = builder.lessThanOrEqualTo(path, getPath(myQuery.getValue(), root));
                break;
            case "like":
                predicate = builder.like(path.as(String.class), "%" + ObjUtil.Convert(String.class, value) + "%");
                break;
            case "rl"://rightLike
                predicate = builder.like(path.as(String.class), ObjUtil.Convert(String.class, value) + "%");
                break;
            case "ll"://leftLike
                predicate = builder.like(path.as(String.class), "%" + ObjUtil.Convert(String.class, value));
                break;
            case "in":
                CriteriaBuilder.In in = builder.in(path);
                String[] arr = String.valueOf(value).split(",");
                for (String v : arr) {
                    in.value(ObjUtil.Convert(path.getJavaType(), v));
                }
                predicate = in;
                break;
            case "notIn":
                CriteriaBuilder.In notin = builder.in(path);
                String[] notarr = String.valueOf(value).split(",");
                for (String v : notarr) {
                    notin.value(ObjUtil.Convert(path.getJavaType(), v));
                }
                predicate = builder.not(path.in(notarr));
                break;
            default:
                predicate = builder.equal(path, value);
                break;
        }
        return predicate;
    }

    Map<String, List<String>> optMap = new HashMap<String, List<String>>() {{
        put("isNotNull", Arrays.asList("isNotNull"));//ISNOTNULL
        put("isNull", Arrays.asList("isNull"));//ISNULL
        put("notEqual", Arrays.asList("notEqual", "!="));
        put("equal", Arrays.asList("equal", "=", "eq"));//EQ
        put("greaterThan", Arrays.asList(">", "gt"));//GT
        put("greaterThanOrEqualTo", Arrays.asList(">=", "gtAndEq"));//GTANDEQ
        put("lessThan", Arrays.asList("<", "lt"));//LT
        put("lessThanOrEqualTo", Arrays.asList("<=", "ltAndEq"));//LTANDEQ
        put("like", Arrays.asList("like"));//LIKE
        put("rightLike", Arrays.asList("rightLike"));//RIGHTLIKE
        put("leftLike", Arrays.asList("leftLike"));//LEFTLIKE
        put("in", Arrays.asList("in"));//IN
        put("notIn", Arrays.asList("notIn"));//NOTIN
    }};

    private List<String> listToUpperCase(List<String> list) {
        list = list.stream().map(String::toUpperCase).collect(Collectors.toList());
        return list;
    }

    private String convertOptType(String optVal) {
        String optType = optVal;

        optVal = optVal.toUpperCase();
        if (listToUpperCase(optMap.get("isNotNull")).contains(optVal)) {
            optType = "isNotNull";
        }
        if (listToUpperCase(optMap.get("isNull")).contains(optVal)) {
            optType = "isNull";
        }
        if (listToUpperCase(optMap.get("notEqual")).contains(optVal)) {
            optType = "!=";
        }
        if (listToUpperCase(optMap.get("equal")).contains(optVal)) {
            optType = "=";
        }
        if (listToUpperCase(optMap.get("greaterThan")).contains(optVal)) {
            optType = ">";
        }
        if (listToUpperCase(optMap.get("greaterThanOrEqualTo")).contains(optVal)) {
            optType = ">=";
        }
        if (listToUpperCase(optMap.get("lessThan")).contains(optVal)) {
            optType = "<";
        }
        if (listToUpperCase(optMap.get("lessThanOrEqualTo")).contains(optVal)) {
            optType = "<=";
        }
        if (listToUpperCase(optMap.get("like")).contains(optVal)) {
            optType = "like";
        }
        if (listToUpperCase(optMap.get("rightLike")).contains(optVal)) {
            optType = "rl";
        }
        if (listToUpperCase(optMap.get("leftLike")).contains(optVal)) {
            optType = "ll";
        }
        if (listToUpperCase(optMap.get("in")).contains(optVal)) {
            optType = "in";
        }
        if (listToUpperCase(optMap.get("notIn")).contains(optVal)) {
            optType = "notIn";
        }
        return optType;
    }

    private <E> Path getPath(String property, Root<E> root) {
        if (property.contains(".")) {
            String[] arr = StringUtils.split(property, ".");
            return root.join(arr[0], JoinType.LEFT).get(arr[1]);
        }
        return root.get(property);
    }

    private <E> Predicate buildRangePredicate(WebRange myRange, Root<E> root, CriteriaBuilder builder) {
        Path path = getPath(myRange.getField(), root);
        Comparable from = null;
        Comparable to = null;
        if (StringUtils.hasLength(myRange.getFrom())) {
            from = (Comparable) ObjUtil.Convert(path.getJavaType(), myRange.getFrom());
        }
        if (StringUtils.hasLength(myRange.getTo())) {
            to = (Comparable) ObjUtil.Convert(path.getJavaType(), myRange.getTo());
        }
        if (myRange.isBetween()) {
            return builder.between(path, from, to);
        } else if (myRange.isFromSet()) {
            return builder.greaterThanOrEqualTo(path, from);
        } else if (myRange.isToSet()) {
            return builder.lessThanOrEqualTo(path, to);
        }
        return null;
    }
}
