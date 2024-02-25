package com.electron.rest.mapper;

import com.electron.rest.dto.order.PaymentInformationDto;
import com.electron.rest.entity.orders.PaymentInformation;
import com.electron.rest.security.EncryptionService;
import org.springframework.stereotype.Component;

@Component
public class PaymentInformationMapper {

    private final EncryptionService encryptionService;

    public PaymentInformationMapper(EncryptionService encryptionService) {
        this.encryptionService = encryptionService;
    }


    public PaymentInformation mapDtoToPaymentInformation(PaymentInformationDto paymentInformation) throws Exception {
        return PaymentInformation.builder()
                .firstName(encryptionService.encrypt(paymentInformation.firstName()))
                .lastName(encryptionService.encrypt(paymentInformation.lastName()))
                .cardNumber(encryptionService.encrypt(paymentInformation.cardNumber()))
                .ccv(encryptionService.encrypt(paymentInformation.ccv().toString()))
                .expiryDate(encryptionService.encrypt(paymentInformation.expiryDate()))
                .build();
    }

}
