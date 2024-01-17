package com.electron.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.task.TaskDecorator;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ElectronEcommerceRestApplication {

    public static void main(String[] args) {
        SpringApplication.run(ElectronEcommerceRestApplication.class, args);
    }



}
