package com.electron.rest.controller;

import com.electron.rest.TestConstants;
import com.electron.rest.sql.SqlQueryAfter;
import com.electron.rest.sql.SqlQueryBefore;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static com.electron.rest.constants.EndpointsPaths.API_V1_AUTH;
import static com.electron.rest.constants.EndpointsPaths.REFRESH_TOKEN;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.is;


@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
public class RefreshTokenTest {


    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JdbcTemplate jdbc;

    @Value("${app-refresh-token-name}")
    private String tokenName;

    private Cookie cookie;

    @BeforeEach
    public void init() {
        cookie = new Cookie(tokenName, TestConstants.REFRESH_TOKEN);
        jdbc.execute(SqlQueryBefore.ADD_ROLES);
        jdbc.execute(SqlQueryBefore.ADD_ACCOUNT_STATUSES);
        jdbc.execute(SqlQueryBefore.ADD_USER);
        jdbc.execute(SqlQueryBefore.ADD_USERS_ROLES_FOR_USER);
        jdbc.execute(SqlQueryBefore.ADD_REFRESH_TOKEN);
    }

    @AfterEach
    public void clean() {

        jdbc.execute(SqlQueryAfter.REMOVE_USER_REFRESH_TOKEN);
        jdbc.execute(SqlQueryAfter.REMOVE_USERS_ROLES_FOR_TEST_USER);
        jdbc.execute(SqlQueryAfter.REMOVE_USER);
        jdbc.execute(SqlQueryAfter.REMOVE_ROLES);
        jdbc.execute(SqlQueryAfter.REMOVE_ACCOUNT_STATUSES);
    }

    @Test
    @DisplayName("[200] POST " + API_V1_AUTH + REFRESH_TOKEN)
    public void successfulRefreshToken() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post(API_V1_AUTH + REFRESH_TOKEN)
                        .cookie(this.cookie))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tokenType", is(TestConstants.TOKEN_TYPE)));
    }

    @Test
    @DisplayName("[403] POST " + API_V1_AUTH + REFRESH_TOKEN)
    public void invalidToken() throws Exception {
        Cookie badCookie = new Cookie(tokenName, "123");

        mockMvc.perform(MockMvcRequestBuilders.post(API_V1_AUTH + REFRESH_TOKEN)
                        .cookie(badCookie))
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.message", is(TestConstants.INVALID_TOKEN)));
    }


}
