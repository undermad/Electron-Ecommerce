package com.electron.rest.mapper;

import com.electron.rest.dto.account.AddressDto;
import com.electron.rest.entity.projections.AddressProjection;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {

    public AddressDto mapAddressToAddressDto(AddressProjection address) {
        return AddressDto.builder()
                .id(address.getId())
                .streetOne(address.getStreetOne())
                .streetTwo(address.getStreetTwo())
                .city(address.getCity())
                .state(address.getState())
                .postcode(address.getPostcode())
                .build();
    }


}
