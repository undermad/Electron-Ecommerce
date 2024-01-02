package com.electron.rest.sql;

import com.electron.rest.TestConstants;

import java.text.SimpleDateFormat;

import static com.electron.rest.TestConstants.*;

public class SqlQueryBefore {

    private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd HH:MM:SS");


    public static final String ADD_ACCOUNT_STATUSES = String.format("INSERT INTO account_statuses(id, status_type) " +
            "VALUES (%s, '%s'), (%s, '%s');",
            ACTIVE_STATUS_ID, ACTIVE_ACCOUNT, AWAITING_ACTIVE_STATUS_ID, AWAITING_ACTIVATION);


    public static final String ADD_ROLES = String.format("INSERT INTO roles(id, role_name) " +
            "VALUES(%s, '%s'), (%s, '%s');", ADMIN_ROLE_ID, ROLE_ADMIN, USER_ROLE_ID, ROLE_USER);

    // test123
    public static final String ADD_USER_ADMIN = String.format("INSERT INTO users(id, email, password, newsletter, account_status_id, created_on)\n" +
            "VALUES ('%s', '%s', '%s', 0, 1, null);", USER_ADMIN_ID, USER_ADMIN_EMAIL, USER_ADMIN_ENCRYPTED_PASSWORD);

    public static final String ADD_USER_USER = String.format("INSERT INTO users(id, email, password, newsletter, account_status_id, created_on)\n" +
            "VALUES ('%s', '%s', '%s', 0, 1, null);", USER_USER_ID, USER_USER_EMAIL, USER_USER_ENCRYPTED_PASSWORD);

    public static final String ADD_USERS_ROLES_FOR_ADMIN = String.format("INSERT INTO users_roles(role_id, user_id)\n" +
            "VALUES (%s, %s);", ADMIN_ROLE_ID, USER_ADMIN_ID);

    public static final String ADD_USERS_ROLES_FOR_USER = String.format("INSERT INTO users_roles(role_id, user_id)\n" +
            "VALUES (%s, %s);", USER_ROLE_ID, USER_USER_ID);

    public static final String ADD_REFRESH_TOKEN = String.format("INSERT INTO refresh_tokens(id, expiry_date, token, user_id) " +
            "VALUES(1, DATE_ADD(now(), INTERVAL 30 DAY), '%s', %s);", REFRESH_TOKEN_ADMIN, USER_ADMIN_ID);

    public static final String ADD_OUTDATED_REFRESH_TOKEN = String.format("INSERT INTO refresh_tokens(id, expiry_date, token, user_id) " +
            "VALUES(2, now(), '%s', %s);", REFRESH_TOKEN_USER, USER_USER_ID);

}
