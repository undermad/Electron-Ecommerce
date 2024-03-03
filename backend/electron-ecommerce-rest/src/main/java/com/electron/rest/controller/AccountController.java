package com.electron.rest.controller;

import com.electron.rest.dto.account.AvatarResponse;
import com.electron.rest.dto.auth.MessageResponse;
import com.electron.rest.service.account.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static com.electron.rest.constants.EndpointsPaths.*;
import static com.electron.rest.constants.SuccessMessages.AVATAR_CHANGED;

@RestController
@RequestMapping(API_V1_ACCOUNT)
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }


    @GetMapping(GET_FULL_NAME)
    public ResponseEntity<String> getUserFullName(@RequestHeader("Authorization") String jwt) {
        return ResponseEntity.ok(accountService.getUserFullName(jwt));
    }

    @GetMapping(GET_AVATAR)
    public ResponseEntity<AvatarResponse> getAvatar(@RequestHeader("Authorization") String jwt) {
        return ResponseEntity.ok(accountService.getAvatar(jwt));
    }

    @PostMapping(CHANGE_AVATAR)
    public ResponseEntity<MessageResponse> changeAvatar(@RequestParam("file") MultipartFile file,
                                                        @RequestHeader("Authorization") String jwt) throws IOException {
        accountService.changeAvatar(file, jwt);
        return ResponseEntity.ok(new MessageResponse(AVATAR_CHANGED));
    }
}
