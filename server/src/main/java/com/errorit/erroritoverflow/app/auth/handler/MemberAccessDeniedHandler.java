package com.errorit.erroritoverflow.app.auth.handler;

import com.errorit.erroritoverflow.app.auth.util.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// AccessDeniedHandler
@Slf4j
@Component
public class MemberAccessDeniedHandler implements AccessDeniedHandler {
    // 인증에는 성공했지만 요청 리소스에 대한 권한이 없을 경우 호출되는 핸들러

    // 처리 로직 구현
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        // 클라이언트에게 ErrorResponder 를 생성해 전달
        ErrorResponder.sendErrorResponse(response, HttpStatus.FORBIDDEN);
        log.warn("Forbidden error happened: {}", accessDeniedException.getMessage());
    }
}
