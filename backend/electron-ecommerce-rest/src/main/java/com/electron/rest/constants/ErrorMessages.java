package com.electron.rest.constants;

public class ErrorMessages {
    public static final String EMAIL_ALREADY_IN_USE = "Email already in use";
    public static final String BAD_CREDENTIALS = "Bad credentials";
    public static final String INVALID_TOKEN = "Invalid token";
    public static final String USER_NOT_FOUND = "User not found";
    public static final String EXPIRED_TOKEN = "Expired token";
    public static final String PRODUCT_NOT_FOUND = "Product not found";
    public static final String OUT_OF_STOCK = "Product out of stock";

    //VALIDATION ERROR MESSAGES
    public static final String PASSWORD_INCORRECT_LENGTH = "Password should have at least 6 characters and no longer than 36";
    public static final String MAX_LENGTH_36 = "Maximum length is 36";
    public static final String BLANK_FIELD = "Field can not be blank";
    public static final String NULL = "Can not be null";
    public static final String INCORRECT_EMAIL_FORMAT = "Incorrect email format";
    public static final String PASSWORDS_MUST_BE_SAME = "Passwords must be the same";


    //ApiExceptions
    public static final String STATUS_NOT_FOUND = "Account status not found";

    // RESOURCES
    public static final String CATEGORY_NOT_FOUND = "Category not found";
    public static final String PAGE_NOT_FOUND = "Page not found";
    public static final String ADDRESS_NOT_FOUND = "Address not found";
    public static final String POSTCODE_ERROR = "Postcode must be 6 characters.";
    public static final String CHECKOUT_NOT_FOUND = "Checkout not found.";

    public static final String SESSION_EXPIRED = "Session expired, please start again.";

    public static final String WRONG_CREDIT_CARD_LENGTH = "Expected 16 digits";
    public static final String LENGTH_MUST_BE_3 = "Length must be 3";
    public static final String WRONG_CREDIT_CARD_EXPIRY_DATE = "Wrong expiry date length.";
    public static final String DELIVERY_ADDRESS_NOT_FOUND = "Delivery address not found.";


}
