package com.jhl.legalcase;

public class LegalCaseConstants {

    public static final String GENERATED_VERIFY_CODE = "_GENERATED_VERIFY_CODE";

    /**
     * 用户被拒绝
     */
    public static final Integer USER_STATUS_DENIED = -1;

    /**
     * 用户刚注册，还没有确认
     */
    public static final Integer USER_STATUS_INITIATED = 0;

    /**
     * 用户已被确认
     */
    public static final Integer USER_STATUS_CONFIRMED = 1;

    /**
     * 用户被锁定，禁用状态
     */
    public static final Integer USER_STATUS_LOCKED = 2;

    /**
     * 缺省每页条数
     */
    public static final int DEFAULT_PAGE_SIZE = 10;

    public static final String USER_ACTION_CONFIRM = "confirm";
    public static final String USER_ACTION_DENY = "deny";
    public static final String USER_ACTION_LOCK = "lock";
    public static final String USER_ACTION_UNLOCK = "unlock";

    public static final Integer CASE_EXECUTION_CREATED = 1;
    public static final Integer CASE_EXECUTION_EXECUTING = 2;
    public static final Integer CASE_EXECUTION_FINISHED = 3;

    public static final Integer CASE_EXECUTION_STEP_ITEM_CREATED = 1;
    public static final Integer CASE_EXECUTION_STEP_ITEM_COMPLETED = 2;

}
