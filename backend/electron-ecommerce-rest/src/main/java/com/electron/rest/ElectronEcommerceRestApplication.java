package com.electron.rest;

import com.electron.rest.entity.product.ProductItem;
import com.electron.rest.utility.DatabaseInitializer;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.task.TaskDecorator;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableAsync
@EnableScheduling
public class ElectronEcommerceRestApplication implements CommandLineRunner {

    private final DatabaseInitializer databaseInitializer;

    public ElectronEcommerceRestApplication(DatabaseInitializer databaseInitializer) {
        this.databaseInitializer = databaseInitializer;
    }

    public static void main(String[] args) {
        SpringApplication.run(ElectronEcommerceRestApplication.class, args);
    }


    @Override
    public void run(String... args) throws Exception {

//        databaseInitializer.initProducts();

    }
}
