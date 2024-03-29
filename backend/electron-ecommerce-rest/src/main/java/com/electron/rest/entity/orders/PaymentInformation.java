package com.electron.rest.entity.orders;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.scheduling.annotation.Async;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
@Entity(name = "payments_information")
public class PaymentInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private Instant createdOn;

    @UpdateTimestamp
    private Instant updatedOn;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "card_number", nullable = false)
    private String cardNumber;

    @Column(name = "ccv", nullable = false)
    private String ccv;

    @Column(name = "expiry_date", nullable = false)
    private String expiryDate;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "paymentInformation")
    private Order order;


}
