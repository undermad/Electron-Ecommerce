package com.electron.rest.controller;

import com.electron.rest.dto.ErrorDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;


@RestController
@RequestMapping("/api/v1/test")
public class TestController {



    @GetMapping
    public ResponseEntity<ErrorDto> getTest(){
        return ResponseEntity.ok(new ErrorDto("im here", new Date(), "motfu"));
    }


}
