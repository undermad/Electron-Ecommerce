package com.electron.rest.dto;

import lombok.*;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageableResponse<T> {
    private String resourceName;
    private List<T> content;
    private int pageNo;
    private int pageSize;
    private int totalPages;
    private long totalElements;
}
