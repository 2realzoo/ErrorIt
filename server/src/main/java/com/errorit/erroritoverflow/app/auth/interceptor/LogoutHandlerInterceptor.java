package com.errorit.erroritoverflow.app.auth.interceptor;

import com.errorit.erroritoverflow.app.auth.jwt.JwtTokenizer;
import com.errorit.erroritoverflow.app.auth.refresh.service.RefreshService;
import com.errorit.erroritoverflow.app.auth.util.ErrorResponder;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class LogoutHandlerInterceptor implements HandlerInterceptor {

    private final RefreshService refreshService;
    private final JwtTokenizer jwtTokenizer;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        log.info("로그아웃 헨들러 실행");
        try {
            String jws = request.getHeader("Authorization").replace("Bearer ", "");
            log.info("Accesstoken = {}", jws);
            // 서명 검증을 위한 시크릿 키 획득
            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

            // 서명 검증 및 claims 획득
            Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

            // DB 의 Refresh 정보 삭제
            refreshService.delete(((Number)claims.get("memberId")).longValue());

            // 응답 구성
            response.setHeader("Authorization", "");
            response.setStatus(HttpStatus.OK.value());
            log.info("로그아웃 핸들러 인터셉터 응답 OK 구성 ");

        } catch (NullPointerException e) {
            log.info("로그아웃 핸들러 인터셉터 NullPointerException ");
            ErrorResponder.sendErrorResponseByExceptionCode(response, ExceptionCode.BAD_REQUEST);
            return false;
        } catch (SignatureException se) {
            log.info("로그아웃 핸들러 인터셉터 SignatureException ");
            ErrorResponder.sendErrorResponseByExceptionCode(response, ExceptionCode.ACCESS_TOKEN_INVALID);
            return false;
        } catch (ExpiredJwtException ee) {
            log.info("로그아웃 핸들러 인터셉터 ExpiredJwtException ");
            ErrorResponder.sendErrorResponseByExceptionCode(response, ExceptionCode.ACCESS_TOKEN_EXPIRED);
            return false;
        } catch (Exception e) {
            log.info("로그아웃 핸들러 인터셉터 Exception ");
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
