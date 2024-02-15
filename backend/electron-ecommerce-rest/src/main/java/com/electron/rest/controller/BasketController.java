package com.electron.rest.controller;

import com.electron.rest.dto.auth.MessageResponse;
import com.electron.rest.dto.basket.AddItemRequest;
import com.electron.rest.dto.basket.BasketResponse;
import com.electron.rest.dto.basket.RemoveItemRequest;
import com.electron.rest.service.basket.BasketItemService;
import jakarta.mail.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.electron.rest.constants.EndpointsPaths.*;
import static com.electron.rest.constants.SuccessMessages.PRODUCT_ADDED;
import static com.electron.rest.constants.SuccessMessages.PRODUCT_REMOVED;

@RestController
@RequestMapping(API_V1_BASKET)
public class BasketController {

    private final BasketItemService basketItemService;

    public BasketController(BasketItemService basketItemService) {
        this.basketItemService = basketItemService;
    }

    @GetMapping("/")
    public ResponseEntity<BasketResponse> getUserBasket(@RequestHeader("Authorization") String jwt) {
        return ResponseEntity.ok(basketItemService.getUserBasket(jwt));
    }

    @PatchMapping(ADD)
    public ResponseEntity<MessageResponse> addToBasket(@RequestHeader("Authorization") String jwt,
                                                       @RequestBody AddItemRequest addItemRequest) {
        basketItemService.increaseItemQuantity(jwt, addItemRequest);
        return ResponseEntity.ok(new MessageResponse(PRODUCT_ADDED));
    }

    @PatchMapping(REMOVE)
    public ResponseEntity<MessageResponse> removeFromBasket(@RequestHeader("Authorization") String jwt,
                                                            @RequestBody RemoveItemRequest removeItemRequest) {
        basketItemService.decreaseItemQuantity(jwt, removeItemRequest);
        return ResponseEntity.ok(new MessageResponse(PRODUCT_REMOVED));
    }


}
