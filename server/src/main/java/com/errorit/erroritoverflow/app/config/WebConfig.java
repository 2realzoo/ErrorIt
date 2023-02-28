package com.errorit.erroritoverflow.app.config;

import com.errorit.erroritoverflow.app.auth.cookie.CookieManager;
import com.errorit.erroritoverflow.app.auth.interceptor.LogoutHandlerInterceptor;
import com.errorit.erroritoverflow.app.auth.interceptor.RefreshCheckInterceptor;
import com.errorit.erroritoverflow.app.auth.interceptor.ResourceCheckInterceptor;
import com.errorit.erroritoverflow.app.auth.jwt.JwtTokenizer;
import com.errorit.erroritoverflow.app.auth.refresh.service.RefreshService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final JwtTokenizer jwtTokenizer;
    private final RefreshService refreshService;
    private final CookieManager cookieManager;

    // 인터셉터 등록과정
    // WebMvcConfigurer 의 구현 메서드
    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        // 접근 리소스 권한 체크
        registry.addInterceptor(new ResourceCheckInterceptor())
                .order(1)
                .addPathPatterns("/members/*", "/members/*/password" ) // 검사 대상
                .excludePathPatterns("/members/email", "/members/password", "/auth/refresh/members/*"); // 제외 대상
        // 리플레쉬 토큰 검증
        registry.addInterceptor(new RefreshCheckInterceptor(jwtTokenizer, refreshService, cookieManager))
                .order(2)
                .addPathPatterns("/auth/refresh/members/*"); // 검사 대상
        // 로그아웃 검증 및 처리
        registry.addInterceptor(new LogoutHandlerInterceptor(refreshService, jwtTokenizer))
                .order(3)
                .addPathPatterns("/logout"); // 검사 대상
    }
}

