package com.errorit.erroritoverflow.app.auth.controller;

import com.errorit.erroritoverflow.app.auth.cookie.CookieManager;
import com.errorit.erroritoverflow.app.auth.jwt.JwtTokenizer;
import com.errorit.erroritoverflow.app.auth.refresh.entity.RefreshToken;
import com.errorit.erroritoverflow.app.auth.refresh.service.RefreshService;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.member.service.MemberService;
import com.errorit.erroritoverflow.app.response.ErrorResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@Slf4j
@RequiredArgsConstructor
@RestController
public class AuthController {

    private final JwtTokenizer jwtTokenizer;
    private final RefreshService refreshService;
    private final CookieManager cookieManager;
    private final MemberService memberService;

    // Access Token 재발급
    @PostMapping("/auth/refresh/members/{member-id}")
    public ResponseEntity<?> resetRefreshToken(@PathVariable("member-id") Long memberId,
                                               HttpServletRequest request) {

        // 쿠키 유무 확인
        log.info("쿠키 유무 확인");
        Cookie refreshCookie = cookieManager.getRefreshCookie(request);
        if (refreshCookie == null) {
            log.info("쿠키 없음");
            return ResponseEntity.badRequest().build();
        }

        // 리플레쉬 토큰 일치확인
        log.info("토큰값 일치 확인");
        RefreshToken savedRefreshToken = refreshService.findByMemberId(memberId);
        if ( !(savedRefreshToken.getKeyValue().equals(refreshCookie.getValue()))) {
            log.info("토큰값 불일치");
            return ResponseEntity.badRequest().build();
        }

        // 리플레쉬 토큰 유효성 확인
        log.info("토큰 유효성 확인");
        try {
            jwtTokenizer.verifySignature(refreshCookie.getValue(), jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()));
        } catch (SignatureException se) {
            log.info("토큰 유효성 확인 실패 : 토큰 검증 실패 ");
            ErrorResponse errorResponse = ErrorResponse.of(ExceptionCode.ACCESS_TOKEN_INVALID);
            return ResponseEntity.badRequest().body(errorResponse);
        } catch (ExpiredJwtException ee) {
            log.info("토큰 유효성 확인 실패 : 토큰 만료 ");
            ErrorResponse errorResponse = ErrorResponse.of(ExceptionCode.ACCESS_TOKEN_EXPIRED);
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            log.info("토큰 유효성 확인 실패");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // 엑세스 토큰 재발급
        Member member = memberService.findById(memberId);
        String accessToken = delegateAccessToken(member);

        return ResponseEntity.ok().header("Authorization", "Bearer " + accessToken)
                .build();
    }

    // 엑세스 토큰 발급
    private String delegateAccessToken(Member member) {

        // 클레임
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("memberId", member.getMemberId());
        claims.put("roles", member.getRoles());

        // jwt 제목
        String subject = member.getEmail();
        // 만료시간
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        // 시크릿키
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        // accessToken 생성
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }
}
