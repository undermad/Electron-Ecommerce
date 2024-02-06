package com.electron.rest.controller;


import com.electron.rest.constants.ErrorMessages;
import com.electron.rest.constants.SuccessMessages;
import com.electron.rest.dto.auth.RegisterDto;
import com.electron.rest.repository.auth.RefreshTokenRepository;
import com.electron.rest.sql.SqlQueryAfter;
import com.electron.rest.sql.SqlQueryBefore;
import com.electron.rest.TestConstants;
import com.electron.rest.dto.auth.LoginDto;
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


import static com.electron.rest.TestConstants.*;
import static com.electron.rest.constants.EndpointsPaths.*;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
public class AuthenticationControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private ObjectMapper mapper;
//
//    @Autowired
//    private JdbcTemplate jdbc;
//
//    @Autowired
//    private RefreshTokenRepository refreshTokenRepository;
//
//    private LoginDto loginDto;
//
//
//    @BeforeEach
//    public void init() {
//        loginDto = new LoginDto(USER_ADMIN_EMAIL, USER_ADMIN_PASSWORD);
//        jdbc.execute(SqlQueryBefore.ADD_ROLES);
//        jdbc.execute(SqlQueryBefore.ADD_ACCOUNT_STATUSES);
//        jdbc.execute(SqlQueryBefore.ADD_USER_ADMIN);
//        jdbc.execute(SqlQueryBefore.ADD_USERS_ROLES_FOR_ADMIN);
//    }
//
//    @AfterEach
//    public void clean() {
//
//        jdbc.execute(SqlQueryAfter.DROP_USER_REFRESH_TOKEN);
//        jdbc.execute(SqlQueryAfter.DROP_USERS_ROLES);
//        jdbc.execute(SqlQueryAfter.DROP_USERS);
//        jdbc.execute(SqlQueryAfter.DROP_ROLES);
//        jdbc.execute(SqlQueryAfter.DROP_ACCOUNT_STATUSES);
//    }
//
//
//    @Test
//    @DisplayName("[200] POST " + API_V1_AUTH + LOGIN + " Successful login.")
//    public void successfulLogin() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders.post(API_V1_AUTH + LOGIN)
//                        .contentType(MediaType.APPLICATION_JSON_VALUE)
//                        .content(mapper.writeValueAsString(loginDto)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.tokenType", is(TestConstants.TOKEN_TYPE)));
//    }
//
//    @Test
//    @DisplayName("[500] POST " + API_V1_AUTH + LOGIN + " Bad credentials.")
//    public void badCredentials() throws Exception {
//        LoginDto incorrectCred = new LoginDto("123", "321");
//
//        mockMvc.perform(MockMvcRequestBuilders.post(API_V1_AUTH + LOGIN)
//                        .contentType(MediaType.APPLICATION_JSON_VALUE)
//                        .content(mapper.writeValueAsString(incorrectCred)))
//                .andExpect(status().is5xxServerError())
//                .andExpect(jsonPath("$.message", is(ErrorMessages.BAD_CREDENTIALS)));
//    }
//
//
//    @Test
//    @DisplayName("[201] POST " + API_V1_AUTH + REGISTER + " Successful registration.")
//    public void successfulRegister() throws Exception {
//        RegisterDto registerDto = new RegisterDto("Dominik"," Tworek",REGISTER_DTO_EMAIL, REGISTER_DTO_PASSWORD, REGISTER_DTO_PASSWORD, REGISTER_DTO_SUBSCRIPTION);
//
//        mockMvc.perform(MockMvcRequestBuilders.post(API_V1_AUTH + REGISTER)
//                        .contentType(MediaType.APPLICATION_JSON_VALUE)
//                        .content(mapper.writeValueAsString(registerDto)))
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.message", is(SuccessMessages.REGISTER_SUCCESS)));
//    }
//
//    @Test
//    @DisplayName("[409] POST " + API_V1_AUTH + REGISTER + " Email already exist.")
//    public void emailAlreadyExist() throws Exception {
//        RegisterDto registerDto = new RegisterDto("Dominik"," Tworek",USER_ADMIN_EMAIL, USER_ADMIN_PASSWORD, USER_ADMIN_PASSWORD, false);
//
//        mockMvc.perform(MockMvcRequestBuilders.post(API_V1_AUTH + REGISTER)
//                        .contentType(MediaType.APPLICATION_JSON_VALUE)
//                        .content(mapper.writeValueAsString(registerDto)))
//                .andExpect(status().isConflict())
//                .andExpect(jsonPath("$.message", is(ErrorMessages.EMAIL_ALREADY_IN_USE)));
//    }
//
//    @Test
//    @DisplayName("[400] POST" + API_V1_AUTH + REGISTER + " Invalid register dto.")
//    public void validationFailed() throws Exception {
//        RegisterDto registerDto = new RegisterDto("Dominik"," Tworek","123", "12345678901234567890123456789012345678901234567890", "123", null);
//
//        mockMvc.perform(MockMvcRequestBuilders.post(API_V1_AUTH + REGISTER)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(mapper.writeValueAsString(registerDto)))
//                .andExpect(jsonPath("$.email", is(ErrorMessages.INCORRECT_EMAIL_FORMAT)))
//                .andExpect(jsonPath("$.password", is(ErrorMessages.PASSWORD_INCORRECT_LENGTH)))
//                .andExpect(jsonPath("$.newsletterSubscription", is(ErrorMessages.NULL)));
//    }
//
//    @Test
//    @DisplayName("[400] POST" + API_V1_AUTH + REGISTER + " Empty register dto.")
//    public void emptyRegisterDto() throws Exception {
//        RegisterDto registerDto = new RegisterDto("Dominik"," Tworek",null, null, null, null);
//
//        mockMvc.perform(MockMvcRequestBuilders.post(API_V1_AUTH + REGISTER)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(mapper.writeValueAsString(registerDto)))
//                .andExpect(jsonPath("$.email", is(ErrorMessages.BLANK_FIELD)))
//                .andExpect(jsonPath("$.password", is(ErrorMessages.BLANK_FIELD)))
//                .andExpect(jsonPath("$.newsletterSubscription", is(ErrorMessages.NULL)));
//    }
//
//    @Test
//    @DisplayName("[400] POST" + API_V1_AUTH + REGISTER + " Different password.")
//    public void differentPassword() throws Exception {
//        RegisterDto registerDto = new RegisterDto("Dominik"," Tworek","unexistingemail@gmail.com", "14315436765", "1234567", null);
//
//        mockMvc.perform(MockMvcRequestBuilders.post(API_V1_AUTH + REGISTER)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(mapper.writeValueAsString(registerDto)))
//                .andExpect(jsonPath("$.message", is(ErrorMessages.PASSWORDS_MUST_BE_SAME)));
//    }


}
