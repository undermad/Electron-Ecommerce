package com.electron.rest.dto.account;

public record AddItemRequest(Long productId, Integer beforeQuantityInBasket) {
}
