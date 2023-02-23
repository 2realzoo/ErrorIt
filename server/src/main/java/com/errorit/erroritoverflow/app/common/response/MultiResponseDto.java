package com.errorit.erroritoverflow.app.common.response;

import com.errorit.erroritoverflow.app.common.pagenation.PageInfo;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

//페이지네이션을 구현하기 위한 DTO(Data Transfer Object) 클래스
@Getter
public class MultiResponseDto<T> {
    private List<T> data;
    private PageInfo pageInfo;

    public MultiResponseDto(List<T> data, Page page) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}