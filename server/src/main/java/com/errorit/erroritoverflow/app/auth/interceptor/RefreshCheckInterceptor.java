package com.errorit.erroritoverflow.app.auth.interceptor;

import com.errorit.erroritoverflow.app.auth.cookie.CookieManager;
import com.errorit.erroritoverflow.app.auth.jwt.JwtTokenizer;
import com.errorit.erroritoverflow.app.auth.refresh.entity.RefreshToken;
import com.errorit.erroritoverflow.app.auth.refresh.service.RefreshService;
import com.errorit.erroritoverflow.app.auth.util.ErrorResponder;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import com.errorit.erroritoverflow.app.utils.UriParser;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// 쿠키 및 리플레쉬 토큰을 검증하는 인터셉터
@RequiredArgsConstructor
@Slf4j
public class RefreshCheckInterceptor implements HandlerInterceptor {

    private final JwtTokenizer jwtTokenizer;
    private final RefreshService refreshService;
    private final CookieManager cookieManager;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        Long memberId = UriParser.getMemberId(request);
        // 쿠키 유무 확인
        log.info("쿠키 유무 확인");
        Cookie refreshCookie = cookieManager.getRefreshCookie(request);
        if (refreshCookie == null) {
            log.info("쿠키 없음");
            ErrorResponder.sendErrorResponseByExceptionCode(response, ExceptionCode.TOKEN_NOT_FOUND);
            return false;
        }

        // 리플레쉬 토큰 일치확인
        log.info("토큰값 일치 확인");
        RefreshToken savedRefreshToken = refreshService.findByMemberId(memberId);
        if ( savedRefreshToken == null
                || !(savedRefreshToken.getKeyValue().equals(refreshCookie.getValue()))) {
            log.info("토큰값 불일치");
            ErrorResponder.sendErrorResponseByExceptionCode(response, ExceptionCode.AUTHORIZED_FAIL);
            return false;
        }

        // 리플레쉬 토큰 유효성 확인
        log.info("토큰 유효성 확인");
        try {
            jwtTokenizer.verifySignature(refreshCookie.getValue(), jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()));
            return true;
        } catch (SignatureException se) {
            log.info("토큰 유효성 확인 실패 : 토큰 검증 실패 ");
            ErrorResponder.sendErrorResponseByExceptionCode(response, ExceptionCode.ACCESS_TOKEN_INVALID);
            return false;
        } catch (ExpiredJwtException ee) {
            log.info("토큰 유효성 확인 실패 : 토큰 만료 ");
            ErrorResponder.sendErrorResponseByExceptionCode(response, ExceptionCode.ACCESS_TOKEN_EXPIRED);
            return false;
        } catch (Exception e) {
            log.info("토큰 유효성 확인 실패");
            ErrorResponder.sendErrorResponseByExceptionCode(response, ExceptionCode.USER_UNAUTHORIZED);
            return false;
        }
    }
}


