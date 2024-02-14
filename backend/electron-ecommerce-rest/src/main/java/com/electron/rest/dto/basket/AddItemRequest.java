package com.electron.rest.dto.basket;

public record AddItemRequest(Long productId, Integer beforeQuantityInBasket) {
}
