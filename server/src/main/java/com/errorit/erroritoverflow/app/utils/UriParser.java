package com.errorit.erroritoverflow.app.utils;

import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public class UriParser {
    public static Long getMemberId(HttpServletRequest request) {
        Map<String, String> pathVariables = (Map<String, String>) request.getAttribute(HandlerMapping. URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        Long memberId = Long.parseLong(pathVariables.get("member-id"));
        return memberId;
    }
}
