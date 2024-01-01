package com.electron.rest.controller;


import com.electron.rest.sql.SqlQueryAfter;
import com.electron.rest.sql.SqlQueryBefore;
import com.electron.rest.TestConstants;
import com.electron.rest.security.auth_dto.LoginDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import static com.electron.rest.TestConstants.USER_ADMIN_EMAIL;
import static com.electron.rest.TestConstants.USER_ADMIN_PASSWORD;
import static com.electron.rest.constants.EndpointsPaths.*;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private JdbcTemplate jdbc;

    private LoginDto loginDto;


    @BeforeEach
    public void init() {
        loginDto = new LoginDto(USER_ADMIN_EMAIL, USER_ADMIN_PASSWORD);
        jdbc.execute(SqlQueryBefore.ADD_ROLES);
        jdbc.execute(SqlQueryBefore.ADD_ACCOUNT_STATUSES);
        jdbc.execute(SqlQueryBefore.ADD_USER_ADMIN);
        jdbc.execute(SqlQueryBefore.ADD_USERS_ROLES_FOR_ADMIN);
    }

    @AfterEach
    public void clean() {

        jdbc.execute(SqlQueryAfter.DROP_USER_REFRESH_TOKEN);
        jdbc.execute(SqlQueryAfter.DROP_USERS_ROLES);
        jdbc.execute(SqlQueryAfter.DROP_USERS);
        jdbc.execute(SqlQueryAfter.DROP_ROLES);
        jdbc.execute(SqlQueryAfter.DROP_ACCOUNT_STATUSES);
    }

    @Test
    public void emptyTest() {

    }


    @Test
    @DisplayName("[200] POST " + API_V1_AUTH + LOGIN)
    public void successfulLogin() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post(API_V1_AUTH + LOGIN)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(mapper.writeValueAsString(loginDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tokenType", is(TestConstants.TOKEN_TYPE)));
    }

    @Test
    @DisplayName("[500] POST " + API_V1_AUTH + LOGIN)
    public void badCredentials() throws Exception {
        LoginDto incorrectCred = new LoginDto("123", "321");

        mockMvc.perform(MockMvcRequestBuilders.post(API_V1_AUTH + LOGIN)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(mapper.writeValueAsString(incorrectCred)))
                .andExpect(status().is5xxServerError())
                .andExpect(jsonPath("$.message", is(TestConstants.BAD_CREDENTIALS_MESSAGE)));
    }


}
