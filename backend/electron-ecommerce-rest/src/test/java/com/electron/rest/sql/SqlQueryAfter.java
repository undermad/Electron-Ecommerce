package com.electron.rest.sql;

public class SqlQueryAfter {


    public static final String DROP_ROLES = "DELETE FROM roles;";
    public static final String DROP_ACCOUNT_STATUSES = "DELETE FROM account_statuses";
    public static final String DROP_USER_REFRESH_TOKEN = "DELETE FROM refresh_tokens;";
    public static final String DROP_USERS_ROLES = "DELETE FROM users_roles;";
    public static final String DROP_USERS = "DELETE FROM users;";

}
