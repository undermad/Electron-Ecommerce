package com.electron.rest.controller;

import com.electron.rest.dto.auth.MessageResponse;
import com.electron.rest.dto.order.CheckoutItemResponse;
import com.electron.rest.service.order.CheckoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.electron.rest.constants.EndpointsPaths.*;
import static com.electron.rest.constants.SuccessMessages.*;

@RestController
@RequestMapping(API_V1_CHECKOUT)
public class CheckoutController {

    private final CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @GetMapping(GET_CHECKOUT_SUMMARY)
    public ResponseEntity<CheckoutItemResponse> getCheckoutSummary(@RequestHeader("Authorization") String jwt) {
        return ResponseEntity.ok(checkoutService.getCheckoutSummary(jwt));
    }

    @PostMapping(BEGIN_CHECKOUT)
    public ResponseEntity<MessageResponse> beginCheckout(@RequestHeader("Authorization") String jwt) {
        checkoutService.startCheckout(jwt);
        return ResponseEntity.ok(new MessageResponse(CHECKOUT_STARTED));
    }

    @DeleteMapping(DELETE)
    public ResponseEntity<MessageResponse> deleteCheckout(@RequestHeader("Authorization") String jwt) {
        checkoutService.deleteCheckout(jwt);
        return ResponseEntity.ok(new MessageResponse(CHECKOUT_DELETED));
    }

}
