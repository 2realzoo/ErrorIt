package com.errorit.erroritoverflow.app.auth.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 인증 성공 시 추가 처리를 할 수 있도록 하는 핸들러
@RequiredArgsConstructor
@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    // Custom AuthenticationSuccessHandler 는 AuthenticationSuccessHandler 인터페이스를 구현해야 한다.

    // 추가처리 로직 구현
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // 인증 성공 시 단순히 로그를 남긴다.
        log.info("# Authenticated successfully!");

        // Authentication 객체에 사용자 정보를 얻은 후, HttpServletResponse 로 출력 스트림을 생성하여 response 를 전송하도록 구성할 수도 있다.
    }
}
