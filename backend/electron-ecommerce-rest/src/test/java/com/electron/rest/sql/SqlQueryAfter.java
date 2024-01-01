package com.electron.rest.sql;

import com.electron.rest.TestConstants;

public class SqlQueryAfter {


    public static final String REMOVE_ROLES = "DELETE FROM roles;";
    public static final String REMOVE_ACCOUNT_STATUSES = "DELETE FROM account_statuses";
    public static final String REMOVE_USER_REFRESH_TOKEN = String.format("DELETE FROM refresh_tokens WHERE user_id = %s;", TestConstants.TEST_USER_ID);
    public static final String REMOVE_USERS_ROLES_FOR_TEST_USER = String.format("DELETE FROM users_roles WHERE user_id = %s", TestConstants.TEST_USER_ID);
    public static final String REMOVE_USER = String.format("DELETE FROM users WHERE id = %s", TestConstants.TEST_USER_ID);

}
