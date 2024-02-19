package com.electron.rest.entity.account;

import com.electron.rest.dto.account.AddressDto;

public interface AddressFactory {
    Address createAddress(AddressDto addressDto);
}
