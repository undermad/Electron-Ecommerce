package com.electron.rest;

import com.electron.rest.service.redis.IdempotencyKey;
import com.electron.rest.service.redis.IdempotencyKeyService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableAsync
@EnableScheduling
public class ElectronEcommerceRestApplication implements CommandLineRunner {


    private final IdempotencyKeyService idempotencyKeyService;

    public ElectronEcommerceRestApplication(IdempotencyKeyService idempotencyKeyService) {
        this.idempotencyKeyService = idempotencyKeyService;
    }

    public static void main(String[] args) {
        SpringApplication.run(ElectronEcommerceRestApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        IdempotencyKey key = new IdempotencyKey("test");
        idempotencyKeyService.checkAndStore(key);
    }
}
