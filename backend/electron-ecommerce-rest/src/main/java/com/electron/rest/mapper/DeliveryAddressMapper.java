package com.electron.rest.mapper;

import com.electron.rest.dto.order.DeliveryAddressDto;
import com.electron.rest.entity.orders.DeliveryAddress;
import org.springframework.stereotype.Component;

@Component
public class DeliveryAddressMapper {

    public DeliveryAddress mapDtoToDeliveryAddress(DeliveryAddressDto address) {
        return DeliveryAddress.builder()
                .fullName(address.recipient())
                .streetOne(address.address().streetOne())
                .streetTwo(address.address().streetTwo())
                .city(address.address().city())
                .state(address.address().state())
                .postcode(address.address().postcode())
                .build();
    }

}
