package com.electron.rest.controller;

import com.electron.rest.dto.account.AddressDto;
import com.electron.rest.dto.auth.MessageResponse;
import com.electron.rest.service.account.AddressService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.electron.rest.constants.EndpointsPaths.*;
import static com.electron.rest.constants.SuccessMessages.*;

@RestController
@RequestMapping(API_V1_ADDRESS)
public class AddressController {

    private final AddressService addressService;


    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping(GET + "/{addressId}")
    public ResponseEntity<AddressDto> getAddress(@PathVariable("addressId") Long addressId,
                                                 @RequestHeader("Authorization") String jwt) {
        return ResponseEntity.ok(addressService.getAddress(addressId, jwt));
    }

    @GetMapping(GET_ALL)
    public ResponseEntity<List<AddressDto>> getAllAddresses(@RequestHeader("Authorization") String jwt) {
        return ResponseEntity.ok(addressService.getAllAddresses(jwt));
    }

    @PostMapping(ADD)
    public ResponseEntity<MessageResponse> addAddress(@Valid @RequestBody AddressDto addressDto,
                                                      @RequestHeader("Authorization") String jwt) {
        addressService.addAddress(addressDto, jwt);
        return ResponseEntity.ok(new MessageResponse(ADDRESS_ADDED));
    }

    @PatchMapping(UPDATE)
    public ResponseEntity<MessageResponse> updateAddress(@Valid @RequestBody AddressDto addressDto,
                                                         @RequestHeader("Authorization") String jwt) {
        addressService.updateAddress(addressDto, jwt);
        return ResponseEntity.ok(new MessageResponse(ADDRESS_UPDATED));
    }

    @DeleteMapping(DELETE + "/{addressId}")
    public ResponseEntity<MessageResponse> deleteAddress(@PathVariable("addressId") Long addressId,
                                                         @RequestHeader("Authorization") String jwt) {
        addressService.deleteAddress(addressId, jwt);
        return ResponseEntity.ok(new MessageResponse(ADDRESS_DELETED));
    }


}
