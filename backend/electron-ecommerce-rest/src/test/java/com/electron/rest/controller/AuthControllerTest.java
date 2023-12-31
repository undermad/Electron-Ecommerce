package com.electron.rest.controller;


import com.electron.rest.security.auth_dto.LoginDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static com.electron.rest.TestConstants.TEST_USER_EMAIL;
import static com.electron.rest.TestConstants.TEST_USER_PASSWORD;
import static com.electron.rest.constants.EndpointsPaths.API_V1_AUTH;
import static com.electron.rest.constants.EndpointsPaths.LOGIN;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
//@Sql(scripts = {"/user-before.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
//@Sql(scripts = "/user-after.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ObjectMapper mapper;

    @Autowired
    private JdbcTemplate jdbc;

    private LoginDto loginDto;

//    private String a = "INSERT INTO users(id, email, password, newsletter, account_status_id, created_on)\n" +
//            "VALUES (999, 'test@test.com', '$2a$10$GyNmk3NsMPz7LzWUzquuY./vjwJSj9f6wMQlU4X46ZPkrFlgZqgfC', 0, 1, null);\n";


    @BeforeEach
    public void init() {
        loginDto = new LoginDto(TEST_USER_EMAIL, TEST_USER_PASSWORD);
//        jdbc.execute(a);
    }

    @Test
    public void successfulLogin() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post(API_V1_AUTH + LOGIN)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(mapper.writeValueAsString(loginDto)))
                .andExpect(status().isOk());

    }


}
