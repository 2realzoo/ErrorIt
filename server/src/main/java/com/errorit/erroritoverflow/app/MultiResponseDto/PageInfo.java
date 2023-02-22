package com.errorit.erroritoverflow.app.MultiResponseDto;

import lombok.*;
import org.springframework.data.domain.Page;

//공통 MultiResponseDto
@Getter
@AllArgsConstructor
public class PageInfo {
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;

    public static <T> PageInfo of(Page<T> page) {
        return new PageInfo(page.getNumber() + 1, page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}