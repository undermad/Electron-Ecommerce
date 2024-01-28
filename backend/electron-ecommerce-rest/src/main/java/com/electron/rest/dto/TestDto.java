package com.electron.rest.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class TestDto {
    private Map<String, List<String>> filters;
}
