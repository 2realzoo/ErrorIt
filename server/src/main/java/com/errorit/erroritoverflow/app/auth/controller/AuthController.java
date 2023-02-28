package com.errorit.erroritoverflow.app.auth.controller;

import com.errorit.erroritoverflow.app.auth.jwt.JwtTokenizer;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@Slf4j
@RequiredArgsConstructor
@RestController
public class AuthController {

    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok().build();
    }

    // Access Token 재발급
    @PostMapping("/auth/refresh/members/{member-id}")
    public ResponseEntity<Void> resetRefreshToken(@PathVariable("member-id") Long memberId) {

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
