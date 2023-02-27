package com.errorit.erroritoverflow.app.auth.handler;

import com.errorit.erroritoverflow.app.auth.jwt.JwtTokenizer;
import com.errorit.erroritoverflow.app.auth.refresh.service.RefreshService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class MemberLogoutHandler implements LogoutHandler {

    private final RefreshService refreshService;
    private final JwtTokenizer jwtTokenizer;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        log.info("로그아웃 헨들러 실행");
        String jws = request.getHeader("Authorization").replace("Bearer ", "");

        // 서명 검증을 위한 시크릿 키 획득
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        // 서명 검증 및 claims 획득
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        // DB 의 Refresh 정보 삭제
        refreshService.delete(((Number)claims.get("memberId")).longValue());

        // 응답 구성
        response.setHeader("Authorization", "");
        response.setStatus(HttpStatus.OK.value());
    }
}
