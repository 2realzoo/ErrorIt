package com.errorit.erroritoverflow.app.config;

import com.errorit.erroritoverflow.app.auth.interceptor.ResourceCheckInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // 인터셉터 등록과정
    // WebMvcConfigurer 의 구현 메서드
    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        // 로그인 필수 체크
        registry.addInterceptor(new ResourceCheckInterceptor())
                .order(1)
                .addPathPatterns("/members/*") // 검사 대상
                .excludePathPatterns("/members/email", "/members/password", "/members/*/password", "/auth/refresh/members/*");
    }
}

