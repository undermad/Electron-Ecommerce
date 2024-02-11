package com.electron.rest.mapper;

import com.electron.rest.dto.product.ReviewDto;
import com.electron.rest.entity.projections.ReviewProjection;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Component
public class ReviewMapper {


    public ReviewDto mapReviewToDto(ReviewProjection reviewProjection) {
        System.out.println(reviewProjection.getCreatedOn());
        LocalDateTime createdOn = LocalDateTime.ofInstant(reviewProjection.getCreatedOn(), ZoneId.systemDefault());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");

        return new ReviewDto(
                reviewProjection.getRate(),
                reviewProjection.getReview(),
                reviewProjection.getFirstName() + " " + reviewProjection.getLastName(),
                createdOn.format(formatter));
    }

}
