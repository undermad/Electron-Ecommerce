package com.electron.rest.controller;

import com.electron.rest.dto.auth.MessageResponse;
import com.electron.rest.dto.order.OrderRequest;
import com.electron.rest.payment.PaymentResult;
import com.electron.rest.service.order.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.electron.rest.constants.EndpointsPaths.API_V1_ORDER;
import static com.electron.rest.constants.EndpointsPaths.PLACE_ORDER;

@RestController
@RequestMapping(API_V1_ORDER)
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping(PLACE_ORDER)
    public ResponseEntity<MessageResponse> placeOrder(@RequestBody OrderRequest orderRequest,
                                                      @RequestHeader("Authorization") String jwt) throws Exception {
        PaymentResult paymentResult = orderService.placeOrder(orderRequest, jwt);
        return ResponseEntity.ok(new MessageResponse(paymentResult.getStatus()));
    }
}
