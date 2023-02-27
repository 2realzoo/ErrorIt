package com.errorit.erroritoverflow.app.auth.interceptor;


import com.errorit.erroritoverflow.app.auth.util.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

// 로그인 한 사용자 본인의 정보만 접근 가능하도록 하는 인터셉터
@Slf4j
public class ResourceCheckInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Map<String, String> pathVariables = (Map<String, String>) request.getAttribute(HandlerMapping. URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        Long memberId = Long.parseLong(pathVariables.get("member-id"));
        Long tokenMemberId = ((Number)request.getAttribute("tokenMemberId")).longValue();
        if (memberId.equals(tokenMemberId)) {
            return true;
        } else {
            ErrorResponder.sendErrorResponseByStatus(response, HttpStatus.FORBIDDEN);
            return false;
        }
    }
}
