package com.errorit.erroritoverflow.app.auth.handler;

import com.errorit.erroritoverflow.app.response.ErrorResponse;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {
    // Custom AuthenticationFailureHandler 는 AuthenticationFailureHandler 인터페이스를 구현

    // 추가 처리 로직 구현
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {

        // 인증 실패 시, 에러 로그를 기록하거나 error response 를 전송할 수 있다.
        log.error("# Authentication failed: {}", exception.getMessage());

        // 응답 객체에 Error 정보를 담는다.
        sendErrorResponse(response);
    }

    // 응답 객체에 Error 정보를 담는다.
    private void sendErrorResponse(HttpServletResponse response) throws IOException {
        // 객체를 Json 으로 변환을 담당
        Gson gson = new Gson();

        ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED); // 에러 객체 생성 및 http 상태코드 지정

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);    // MediaType 지정
        response.setStatus(HttpStatus.UNAUTHORIZED.value());          // 응답할 상태코드 지정 : UNAUTHORIZED

        //  Gson 을 이용해 ErrorResponse 객체를 JSON 포맷 문자열로 변환 후, 출력 스트림을 생성
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
