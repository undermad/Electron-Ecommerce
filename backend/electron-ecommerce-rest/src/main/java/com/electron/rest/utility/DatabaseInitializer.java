package com.electron.rest.utility;

import com.electron.rest.dto.product.CategoryResponse;
import com.electron.rest.entity.product.*;
import com.electron.rest.repository.product.CategoryRepository;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.*;

@Component
public class DatabaseInitializer {

    private final CategoryRepository categoryRepository;

    public DatabaseInitializer(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    public void initProducts() {

        Category graphicsCardCategory = Category.builder()
                .name("Graphics Cards")
                .build();

        // Variations
        Variation memoryVariation = createVariation("Memory", graphicsCardCategory, "24GB", "16GB", "12GB", "8GB");
        Variation brandVariation = createVariation("Brand", graphicsCardCategory, "Gigabyte", "MSI", "Palit");
        Variation referenceCardBrandVariation = createVariation("Reference Card Brand", graphicsCardCategory, "Nvidia", "AMD");
        Variation baseClockSpeedVariation = createVariation("Base Clock Speed", graphicsCardCategory, "1500-1999 Mhz", "2000-2500 Mhz");
        Variation numberOfFansVariation = createVariation("Number of Fans", graphicsCardCategory, "2", "3");

        // Generating product items with combinations of variations
        for (int i = 1; i <= 10; i++) {
            Set<VariationOption> variationOptions = new HashSet<>();
            variationOptions.add(getRandomOption(memoryVariation));
            variationOptions.add(getRandomOption(brandVariation));
            variationOptions.add(getRandomOption(referenceCardBrandVariation));
            variationOptions.add(getRandomOption(baseClockSpeedVariation));
            variationOptions.add(getRandomOption(numberOfFansVariation));

            ProductItem productItem = ProductItem.builder()
                    .name("Graphics Card " + i)
                    .description("High-performance graphics card with various features.")
                    .imgUrl("https://example.com/graphics_card_" + i + ".jpg")
                    .stockQuantity(new Random().nextInt(50) + 1) // Random stock quantity between 1 and 50
                    .price(new BigDecimal("500.00").multiply(new BigDecimal(i))) // Example pricing strategy
                    .category(graphicsCardCategory)
                    .variationOptions(variationOptions)
                    .build();



            System.out.println("Generated product item: " + productItem.getName());
        }
    }

    private static Variation createVariation(String name, Category category, String... options) {
        Variation variation = Variation.builder()
                .name(name)
                .category(category)
                .build();

        List<VariationOption> variationOptions = new ArrayList<>();
        for (String optionValue : options) {
            VariationOption option = VariationOption.builder()
                    .value(optionValue)
                    .variation(variation)
                    .build();
            variationOptions.add(option);
        }

        variation.setVariationOptions(variationOptions);
        return variation;
    }

    private static VariationOption getRandomOption(Variation variation) {
        List<VariationOption> options = variation.getVariationOptions();
        return options.get(new Random().nextInt(options.size()));
    }

}
