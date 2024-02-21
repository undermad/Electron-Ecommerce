package com.electron.rest.controller;

import com.electron.rest.constants.SuccessMessages;
import com.electron.rest.dto.auth.MessageResponse;
import com.electron.rest.dto.order.CheckoutItemResponse;
import com.electron.rest.service.order.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.electron.rest.constants.EndpointsPaths.*;
import static com.electron.rest.constants.SuccessMessages.CHECKOUT_STARTED;

@RestController
@RequestMapping(API_V1_ORDER)
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping(GET_CHECKOUT_SUMMARY)
    public ResponseEntity<CheckoutItemResponse> getCheckoutSummary(@RequestHeader("Authorization") String jwt) {
        return ResponseEntity.ok(orderService.getCheckoutSummary(jwt));
    }

    @PostMapping(BEGIN_CHECKOUT)
    public ResponseEntity<MessageResponse> beginCheckout(@RequestHeader("Authorization") String jwt) {
        orderService.beginCheckout(jwt);
        return ResponseEntity.ok(new MessageResponse(CHECKOUT_STARTED));
    }

}
