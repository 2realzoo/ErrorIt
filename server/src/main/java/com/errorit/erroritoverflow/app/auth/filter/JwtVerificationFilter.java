package com.errorit.erroritoverflow.app.auth.filter;

import com.errorit.erroritoverflow.app.auth.CustomAuthorityUtils;
import com.errorit.erroritoverflow.app.auth.jwt.JwtTokenizer;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.SignatureException;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
    // OncePerRequestFilter 를 확장해서 request 당 한번만 실행되는 Security Filter 를 구현
    // 인증과 관련된 Filter 는 성공이냐 실패냐를 단 한번만 판단하면 된다.어중간한 결과는 존재하지 않으며 여러번 판단할 필요도 없다.
    // JWT 검증은 request 당 단 한번만 수행하면 되기 때문에 JWT 전용 Filter 로 만들기에는 OncePerRequestFilter 를 이용하는 것이 적절

    // JwtTokenizer : JWT 검증 및 토큰 정보 획득 역할
    private final JwtTokenizer jwtTokenizer;
    // CustomAuthorityUtils : JWT 검증에 성공하면 Authentication 객체에 채울 사용자의 권한을 생성하는 역할
    private final CustomAuthorityUtils authorityUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // JwtVerificationFilter 예외 처리
        // Exception 을 catch 한 후에 Exception 을 다시 throw 한다든지하는 처리를 하지 않고,
        // 단순히 request.setAttribute()를 설정하는 일 밖에 하지 않는다.
        try {
            // request 에서 토큰을 통한 Claims 획득
            Map<String, Object> claims = verifyJws(request);
            // Authentication 객체를 SecurityContext 에 저장
            setAuthenticationToContext(claims);

            request.setAttribute("tokenMemberId", claims.get("memberId"));

            // 예외가 발생하게되면 SecurityContext 에 클라이언트의 인증 정보(Authentication 객체)가 저장되지 않는다.
            // SecurityContext 에 클라이언트의 인증 정보가 채워지지 않은 상태에서 Security Filter 로직을 수행하게되면 AuthenticationException 이 발생한다.

            // SecurityContext 에 클라이언트의 인증 정보(Authentication 객체)가 저장되지 않은 상태로
            // 다음(next) Security Filter 로직을 수행하다보면 결국에는 AuthenticationException 이 발생하게 되고,
            // 이 AuthenticationException 은 AuthenticationEntryPoint 가 처리하게 된다.
            // request 에 추가된 attribute 는 AuthenticationEntryPoint 에서 사용 가능하다.
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        // 다음 필터(사큐리티 필터) 호출
        filterChain.doFilter(request, response);
    }

    // OncePerRequestFilter 의 shouldNotFilter()를 오버라이드
    // 특정 조건에 부합하면( true 이면 ) 해당 Filter 의 동작을 수행하지 않고 다음 Filter 로 점프하도록 한다.
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        // 헤더에서 authorization 획득
        String authorization = request.getHeader("Authorization");
        // Authorization header 의 값이 null 이거나 Authorization header 의 값이 “Bearer”로 시작하지 않는다면 해당 Filter 의 동작을 수행하지 않도록 정의한다.
        // 요청 헤더에 Authorization(JWT) 가 포함되지 않았다면 JWT 자격증명이 필요하지 않은 리소스에 대한 요청이라고 판단하고 점프킨다.
        // 만약 JWT 자격증명이 필요한 리소스 요청인데 JWT 를 누락시키고 보낸 요청의 경우 :
        // Authentication 이 정상적으로 SecurityContext 에 저장되지 않은 상태이기 때문에 다른 Security Filter 를 거쳐 결국 Exception 을 던지게 된다.
        return authorization == null || !authorization.startsWith("Bearer");
    }

    // request 에서 토큰을 통한 Claims 획득
    // :TODO Cookie 에서 값을 꺼내도록 변경
    private Map<String, Object> verifyJws(HttpServletRequest request) throws ExpiredJwtException, SignatureException {

        // JWS(JSON Web Token Signed) 획득
        String jws = request.getHeader("Authorization").replace("Bearer ", "");

        // 서명 검증을 위한 시크릿 키 획득
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        // 서명 검증 및 claims 획득
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    // Authentication 객체를 SecurityContext 에 저장
    private void setAuthenticationToContext(Map<String, Object> claims) {

        String username = (String) claims.get("email");

        // Claims 의 권한정보를 기반으로 List<GrantedAuthority> 생성
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));

        // username, List<GrantedAuthority> 를 포함한 Authentication 객체를 생성
        // Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);

        // Authentication 객체를 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);

        /*
            SecurityContext 에 Authentication 을 저장하게 되면 Spring Security 의 세션 정책(Session Policy)에 따라서 세션을 생성할 수도 있고, 그렇지 않을 수도 있다.
            JWT 환경에서는 세션 정책(Session Policy) 설정을 통해 세션 자체를 생성하지 않도록 설정한다.
         */
    }
}

