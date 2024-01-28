package com.electron.rest.utility;

import com.electron.rest.repository.product.ProductItemWithFilterRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MainMethod {

    private final ProductItemWithFilterRepository productItemWithFilterRepository;

    public MainMethod(ProductItemWithFilterRepository productItemWithFilterRepository) {
        this.productItemWithFilterRepository = productItemWithFilterRepository;
    }

    public static void main(String[] args) {


        Map<String, List<String>> map = new HashMap<>();
        List<String> brands = List.of("CORSAIR", "KINGSTON");
        map.put("Brand", brands);



    }
}
