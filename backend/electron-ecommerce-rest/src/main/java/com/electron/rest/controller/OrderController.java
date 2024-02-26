package com.electron.rest.controller;

import com.electron.rest.dto.auth.MessageResponse;
import com.electron.rest.dto.order.OrderRequest;
import com.electron.rest.dto.order.OrderResponse;
import com.electron.rest.payment.PaymentResult;
import com.electron.rest.service.order.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.electron.rest.constants.EndpointsPaths.*;

@RestController
@RequestMapping(API_V1_ORDER)
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    @GetMapping(GET_ALL)
    public ResponseEntity<List<OrderResponse>> getOrders(@RequestHeader("Authorization") String jwt) {
        return ResponseEntity.ok(orderService.getOrders(jwt));
    }


    @PostMapping(PLACE_ORDER)
    public ResponseEntity<MessageResponse> placeOrder(@Valid @RequestBody OrderRequest orderRequest,
                                                      @RequestHeader("Authorization") String jwt) throws Exception {
        PaymentResult paymentResult = orderService.placeOrder(orderRequest, jwt);
        return ResponseEntity.ok(new MessageResponse(paymentResult.getStatus()));
    }
}
