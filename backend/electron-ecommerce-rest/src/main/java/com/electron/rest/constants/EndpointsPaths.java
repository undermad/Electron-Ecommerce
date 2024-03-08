package com.electron.rest.constants;

public class EndpointsPaths {

    // AuthenticationController
    public static final String API_V1_AUTH = "/api/v1/auth";
    public static final String LOGIN = "/login";
    public static final String REFRESH_TOKEN = "/refreshtoken";
    public static final String LOGOUT = "/logout";
    public static final String LOGOUT_EVERYWHERE = "/logout_everywhere";
    public static final String FORGOT_PASSWORD = "/forgot_password";
    public static final String CHANGE_FORGOTTEN_PASSWORD = "/change_forgotten_password";
    public static final String GET_FULL_NAME = "/get_full_name";


    // RegistrationController
    public static final String API_V1_REGISTRATION = "/api/v1/registration";
    public static final String REGISTER = "/register";
    public static final String ACTIVATE = "/activate";


    // Category
    public static final String API_V1_CATEGORY = "/api/v1/category";

    // API_V1_PRODUCT
    public static final String API_V1_PRODUCT = "/api/v1/product";
    public static final String GET_BY_QUERY = "get_by_query";
    public static final String GET_HOT_PRODUCTS = "/hot";
    public static final String GET_HOT_CATEGORY_PRODUCTS = "/hot_category";

    public static final String API_V1_CHECKOUT = "/api/v1/checkout";
    public static final String BEGIN_CHECKOUT = "/begin_checkout";
    public static final String GET_CHECKOUT_SUMMARY = "/get_checkout_summary";


    public static final String API_V1_BASKET = "/api/v1/basket";
    public static final String ADD = "/add";
    public static final String REMOVE = "/remove";

    public static final String GET = "/get";
    public static final String GET_ALL = "/get_all";
    public static final String UPDATE = "/update";
    public static final String DELETE = "/delete";

    public static final String API_V1_ADDRESS = "/api/v1/address";
    public static final String CHANGE_PASSWORD = "/change_password";

    public static final String API_V1_ORDER = "/api/v1/order";
    public static final String PLACE_ORDER = "/place_order";

    public static final String API_V1_NEWSLETTER = "/api/v1/newsletter";


    public static final String API_V1_ACCOUNT = "/api/v1/account";
    public static final String CHANGE_AVATAR = "/change_avatar";
    public static final String GET_AVATAR = "/get_avatar";
}
