package com.electron.rest.controller;

import com.electron.rest.dto.auth.MessageResponse;
import com.electron.rest.dto.basket.AddItemRequest;
import com.electron.rest.service.basket.BasketItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.electron.rest.constants.EndpointsPaths.ADD;
import static com.electron.rest.constants.EndpointsPaths.API_V1_BASKET;
import static com.electron.rest.constants.SuccessMessages.PRODUCT_ADDED;

@RestController
@RequestMapping(API_V1_BASKET)
public class BasketController {

    private final BasketItemService basketItemService;

    public BasketController(BasketItemService basketItemService) {
        this.basketItemService = basketItemService;
    }


    @PostMapping(ADD)
    public ResponseEntity<MessageResponse> addToBasket(@RequestHeader("Authorization") String jwt,
                                                       @RequestBody AddItemRequest addItemRequest) {
        basketItemService.addItemToBasket(jwt, addItemRequest);
        return ResponseEntity.ok(new MessageResponse(PRODUCT_ADDED));
    }
}
