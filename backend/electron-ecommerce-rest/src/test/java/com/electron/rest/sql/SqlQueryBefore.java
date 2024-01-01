package com.electron.rest.sql;

import com.electron.rest.TestConstants;

import java.text.SimpleDateFormat;

public class SqlQueryBefore {

    private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd HH:MM:SS");


    public static final String ADD_ACCOUNT_STATUSES = String.format("INSERT INTO account_statuses(id, status_type) " +
            "VALUES (%s, '%s');", TestConstants.ACTIVE_ACCOUNT_ID, TestConstants.ACTIVE_ACCOUNT);
    public static final String ADD_ROLES = String.format("INSERT INTO roles(id, role_name) " +
            "VALUES(%s, '%s');", TestConstants.ADMIN_ROLE_ID, TestConstants.ROLE_ADMIN);

    // test123
    public static final String ADD_USER = String.format("INSERT INTO users(id, email, password, newsletter, account_status_id, created_on)\n" +
            "VALUES ('%s', '%s', '%s', 0, 1, null);", TestConstants.TEST_USER_ID, TestConstants.TEST_USER_EMAIL, TestConstants.TEST_USER_ENCRYPTED_PASSWORD);

    public static final String ADD_USERS_ROLES_FOR_USER = String.format("INSERT INTO users_roles(role_id, user_id)\n" +
            "VALUES (%s, %s);", TestConstants.ADMIN_ROLE_ID, TestConstants.TEST_USER_ID);

    public static final String ADD_REFRESH_TOKEN = String.format("INSERT INTO refresh_tokens(id, expiry_date, token, user_id) " +
            "VALUES(1, DATE_ADD(now(), INTERVAL 30 DAY), '%s', %s);", TestConstants.REFRESH_TOKEN, TestConstants.TEST_USER_ID);

}
