package com.errorit.erroritoverflow.app.auth.interceptor;


import com.errorit.erroritoverflow.app.auth.util.ErrorResponder;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public class ResourceCheckInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        Map<String, String> pathVariables = (Map<String, String>) request.getAttribute(HandlerMapping. URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        Long memberId = Long.parseLong(pathVariables.get("memberId"));
        Long tokenMemberId = (Long) request.getAttribute("tokenMemberId");
        if (memberId.equals(tokenMemberId)) {
            return true;
        } else {
            ErrorResponder.sendErrorResponseByStatus(response, HttpStatus.FORBIDDEN);
            return false;
        }
    }
}
