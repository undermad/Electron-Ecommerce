package com.electron.rest.service.account;

import com.electron.rest.dto.account.AddressDto;
import com.electron.rest.entity.account.Address;
import com.electron.rest.entity.account.AddressFactory;
import com.electron.rest.entity.projections.AddressProjection;
import com.electron.rest.entity.user.UserFactory;
import com.electron.rest.entity.user.User;
import com.electron.rest.exception.ResourceNotFoundException;
import com.electron.rest.mapper.AddressMapper;
import com.electron.rest.repository.account.AddressRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.electron.rest.constants.ErrorMessages.ADDRESS_NOT_FOUND;

@Service
public class AddressService {

    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;

    @Qualifier("userIdFactory")
    private final UserFactory<String> userFactory;
    private final AddressFactory addressFactory;

    public AddressService(AddressRepository addressRepository, AddressMapper addressMapper, UserFactory<String> userFactory, AddressFactory addressFactory) {
        this.addressRepository = addressRepository;
        this.addressMapper = addressMapper;
        this.userFactory = userFactory;
        this.addressFactory = addressFactory;
    }

    public AddressDto getAddress(Long addressId, String jwt) {
        User user = userFactory.createUser(jwt);
        AddressProjection addressProjection = addressRepository.getAddress(addressId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException(ADDRESS_NOT_FOUND));
        return addressMapper.mapAddressProjToAddressDto(addressProjection);

    }

    public List<AddressDto> getAllAddresses(String jwt) {
        User user = userFactory.createUser(jwt);
        List<AddressProjection> addressesAsProjections = addressRepository.getAllByUserId(user.getId());
        if (addressesAsProjections.isEmpty()) return new ArrayList<>();
        return addressesAsProjections.stream()
                .map(addressMapper::mapAddressProjToAddressDto)
                .collect(Collectors.toList());
    }

    public void addAddress(AddressDto addressDto, String jwt) {
        User user = userFactory.createUser(jwt);
        Address address = addressFactory.createAddress(addressDto);
        address.setUser(user);
        addressRepository.save(address);
    }

    @Transactional
    public void updateAddress(AddressDto addressDto, String jwt) {
        User user = userFactory.createUser(jwt);
        addressRepository.checkIfExist(addressDto.id()).orElseThrow(() -> new ResourceNotFoundException(ADDRESS_NOT_FOUND));
        addressRepository.update(addressDto.streetOne(),
                addressDto.streetTwo(),
                addressDto.state(),
                addressDto.city(),
                addressDto.postcode(),
                addressDto.id(),
                user.getId());
    }

    @Transactional
    public void deleteAddress(Long addressId, String jwt) {
        User user = userFactory.createUser(jwt);
        addressRepository.deleteAddress(addressId, user.getId());
    }

}
