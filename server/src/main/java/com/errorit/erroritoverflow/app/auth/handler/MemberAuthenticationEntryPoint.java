package com.errorit.erroritoverflow.app.auth.handler;

import com.errorit.erroritoverflow.app.auth.util.ErrorResponder;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.SignatureException;

// AuthenticationEntryPoint 는
// SignatureException, ExpiredJwtException 등 Exception 발생으로 인해
// SecurityContext 에 Authentication 이 저장되지 않을 경우 등
// AuthenticationException 이 발생할 때 호출되는 핸들러 같은 역할
@Slf4j
@Component
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {
    // MemberAuthenticationEntryPoint 는 인증 과정 에서 AuthenticationException 이 발생하는 경우 호출

    // 처리하고자 하는 로직 구현
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) {
        Exception exception = (Exception) request.getAttribute("exception");

        // 클라이언트에게 ErrorResponse 를 생성해 전송
        if (exception instanceof SignatureException) {
            ErrorResponder.sendErrorResponseByExceptionCode(response, ExceptionCode.ACCESS_TOKEN_INVALID);
        } else if (exception instanceof ExpiredJwtException) {
            ErrorResponder.sendErrorResponseByExceptionCode(response, ExceptionCode.ACCESS_TOKEN_EXPIRED);
        } else {
            ErrorResponder.sendErrorResponseByStatus(response, HttpStatus.UNAUTHORIZED);
        }

        // 로그 기록
        logExceptionMessage(authException, exception);
    }

    private void logExceptionMessage(AuthenticationException authException, Exception exception) {
        String message = exception != null ? exception.getMessage() : authException.getMessage();
        log.warn("Unauthorized error happened: {}", message);
    }
}
