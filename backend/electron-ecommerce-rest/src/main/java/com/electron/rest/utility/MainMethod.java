package com.electron.rest.utility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class MainMethod {


    public static void main(String[] args) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println(passwordEncoder.encode("test123"));

        String test = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJkdHdvcmVrOTRAZ21haWwuY29tIiwiaWF0IjoxNzA0MDYxNDAzLCJleHAiOjE3MDQwNjUwMDN9.hfdIXA5LLU3aKB39bXgKILL6g6__j58JCbT70eMbcXFzhmmpAkvwlZQXI0UUQ-lc";
        System.out.println(test.length());
    }
}
