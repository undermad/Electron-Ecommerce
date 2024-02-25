package com.electron.rest.constants;

import lombok.Getter;

@Getter
public enum OrderStatus {

    PROCESSING("Processing");

    private final String status;

    OrderStatus(String status) {
        this.status = status;
    }

}

