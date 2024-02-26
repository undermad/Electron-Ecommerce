package com.electron.rest.mapper;

import com.electron.rest.dto.order.OrderItemDto;
import com.electron.rest.dto.order.OrderResponse;
import com.electron.rest.entity.projections.DeliveryAddressProjection;
import com.electron.rest.entity.projections.OrderItemProjection;
import com.electron.rest.entity.projections.OrderProjection;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderMapper {


    public OrderResponse mapToOrderResponse(OrderProjection orderProjection,
                                            DeliveryAddressProjection deliveryAddressProjection,
                                            List<OrderItemProjection> orderItemProjections) {
        return OrderResponse.builder()
                .status(orderProjection.getStatus())
                .totalItems(orderProjection.getTotalItems())
                .totalPrice(orderProjection.getTotalPrice().doubleValue())
                .fullName(deliveryAddressProjection.getFullName())
                .streetOne(deliveryAddressProjection.getStreetOne())
                .streetTwo(deliveryAddressProjection.getStreetTwo())
                .city(deliveryAddressProjection.getCity())
                .state(deliveryAddressProjection.getState())
                .postcode(deliveryAddressProjection.getPostCode())
                .orderItems(orderItemProjections.stream()
                        .map(orderItemProjection -> OrderItemDto.builder()
                                .name(orderItemProjection.getName())
                                .description(orderItemProjection.getDescription())
                                .imgUrl(orderItemProjection.getImgUrl())
                                .totalPrice(orderItemProjection.getTotalPrice().doubleValue())
                                .quantity(orderItemProjection.getQuantity())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

}
