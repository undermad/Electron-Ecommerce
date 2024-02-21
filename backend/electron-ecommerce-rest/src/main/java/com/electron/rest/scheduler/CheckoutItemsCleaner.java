package com.electron.rest.scheduler;

import com.electron.rest.entity.projections.CheckoutItemProjection;
import com.electron.rest.repository.CheckoutItemRepository;
import com.electron.rest.repository.product.ProductItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
public class CheckoutItemsCleaner implements Scheduler {

    private final CheckoutItemRepository checkoutItemRepository;
    private final ProductItemRepository productItemRepository;

    public CheckoutItemsCleaner(CheckoutItemRepository checkoutItemRepository, ProductItemRepository productItemRepository) {
        this.checkoutItemRepository = checkoutItemRepository;
        this.productItemRepository = productItemRepository;
    }


    @Transactional
    @Async
    @Scheduled(fixedRateString = "${schedule-clear-checkout-items}")
    @Override
    public void performTask() {
        Instant deadline = Instant.now().minus(15, ChronoUnit.MINUTES);
        List<CheckoutItemProjection> itemsToKill = checkoutItemRepository.findItemsOlderThan(deadline);
        itemsToKill.forEach(item -> {
            productItemRepository.increaseQuantity(item.getQuantity(), item.getProductItemId());
            checkoutItemRepository.deleteItemById(item.getId());
        });
    }
}
