package com.errorit.erroritoverflow.app.auth.filter;

import com.errorit.erroritoverflow.app.auth.cookie.CookieManager;
import com.errorit.erroritoverflow.app.auth.dto.LoginDto;
import com.errorit.erroritoverflow.app.auth.jwt.JwtTokenizer;
import com.errorit.erroritoverflow.app.auth.refresh.entity.RefreshToken;
import com.errorit.erroritoverflow.app.auth.refresh.service.RefreshService;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    // UsernamePasswordAuthenticationFilter 를 상속
    // UsernamePasswordAuthenticationFilter 는 폼로그인 방식에서 사용하는 디폴트 Security Filter 로써,
    // 폼로그인이 아니더라도 Username/Password 기반의 인증을 처리하기 위해 UsernamePasswordAuthenticationFilter 를 확장해서 구현할 수 있다.

    // AuthenticationManager 는 로그인 인증 정보(Username/Password)를 전달 받아 UserDetailsService 와 인터랙션 한뒤 인증 여부를 판단합니다.
    private final AuthenticationManager authenticationManager;
    // JwtTokenizer 는 클라이언트가 인증에 성공할 경우, JWT 를 생성 및 발급하는 역할
    private final JwtTokenizer jwtTokenizer;
    // 쿠키 생성 및 쿠키 획득을 담당
    private final CookieManager cookieManager;

    private final RefreshService refreshService;

    // 인증을 시도하는 메서드
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        // 클라이언트에서 전송한 Username 과 Password 를 DTO 클래스로 역직렬화(Deserialization)하기 위해 ObjectMapper 인스턴스를 생성
        ObjectMapper objectMapper = new ObjectMapper();

        // objectMapper.readValue(request.getInputStream(), LoginDto.class)를 통해 ServletInputStream 을 LoginDto 클래스의 객체로 역직렬화(Deserialization)
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
        return authenticationManager.authenticate(authenticationToken);
    }

    // 클라이언트의 인증 정보를 이용해 인증에 성공할 경우 호출
    // response 에 토큰을 추가하는 역할
    // 쿠키에 추가하는 부분으로 변경해야한다.
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {

        // Member 엔티티 획득
        // AuthenticationManager 내부에서 인증에 성공하면
        // 인증된 Authentication 객체가 생성되면서 principal 필드에 Member 객체가 할당
        Member member = (Member) authResult.getPrincipal();

        // Access Token 을 생성
        String accessToken = delegateAccessToken(member);
        // Refresh Token을 생성
        String refreshToken = delegateRefreshToken(member);

        // Refresh Token DB 저장
        RefreshToken refreshTokenEntity = new RefreshToken();
        refreshTokenEntity.setMember(member);
        refreshTokenEntity.setKeyValue(refreshToken);
        refreshService.saveOrUpdate(refreshTokenEntity);

        // AccessToken: 헤더 설정
        response.setHeader("Authorization", "Bearer " + accessToken);
        // RefreshToken : 쿠키 설정
        cookieManager.generateRefreshCookie(response, refreshToken);

        // 응답 코드
        response.setStatus(200);

        // 추가 처리 핸들러 호출
        // AuthenticationSuccessHandler 의 onAuthenticationSuccess() 메서드를 호출
        // 등록한 MemberAuthenticationSuccessHandler 가 호출된다.
        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    // AccessToken 생성
    private String delegateAccessToken(Member member) {

        // 클레임
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("id", member.getId());
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

    // RefreshToken 생성
    private String delegateRefreshToken(Member member) {
        // jwt 제목
        String subject = member.getEmail();
        // 만료시간
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        // 시크릿키
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        // refreshToken 생성
        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
