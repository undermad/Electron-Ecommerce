package com.electron.rest.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class TestDto {
    private Map<String, List<String>> filters;
}
