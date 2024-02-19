package com.electron.rest.entity.account;

import com.electron.rest.dto.account.AddressDto;
import org.springframework.stereotype.Component;

@Component
public class AddressFactoryImpl implements AddressFactory {
    @Override
    public Address createAddress(AddressDto addressDto) {
        return Address.builder()
                .streetOne(addressDto.streetOne())
                .streetTwo(addressDto.streetTwo())
                .state(addressDto.state())
                .city(addressDto.city())
                .postcode(addressDto.postcode())
                .build();
    }
}
