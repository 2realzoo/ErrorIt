package com.errorit.erroritoverflow.app.config;

import com.errorit.erroritoverflow.app.auth.CustomAuthorityUtils;
import com.errorit.erroritoverflow.app.auth.cookie.CookieManager;
import com.errorit.erroritoverflow.app.auth.filter.JwtAuthenticationFilter;
import com.errorit.erroritoverflow.app.auth.filter.JwtVerificationFilter;
import com.errorit.erroritoverflow.app.auth.handler.MemberAccessDeniedHandler;
import com.errorit.erroritoverflow.app.auth.handler.MemberAuthenticationEntryPoint;
import com.errorit.erroritoverflow.app.auth.handler.MemberAuthenticationFailureHandler;
import com.errorit.erroritoverflow.app.auth.handler.MemberAuthenticationSuccessHandler;
import com.errorit.erroritoverflow.app.auth.jwt.JwtTokenizer;
import com.errorit.erroritoverflow.app.auth.refresh.service.RefreshService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

// SecurityConfig

// Spring Security 5.7 이전 버전에서는 HTTP 보안 설정을 구성하기 위해 WebSecurityConfigurerAdapter 를 상속하는 형태의 방법을 주로 사용했지만
// WebSecurityConfigurerAdapter 는 5.7.0에서 Deprecated 되었습니다.
// 따라서 SecurityFilterChain 을 Bean 으로 등록해서 HTTP 보안 설정을 구성하는 방식을 권장한다.

@RequiredArgsConstructor
@Configuration
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils; // 자격 부여 역할
    private final CookieManager cookieManager;
    private final RefreshService refreshService;

    // SecurityFilterChain Bean 등록
    // Spring Security 에서 HTTP 보안을 설정하기 위한 기본 구성
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // HttpSecurity : HTTP 요청에 대한 보안 설정을 구성하기 위한 핵심 클래스
        http
                // H2 웹 콘솔의 화면 자체가 내부적으로 태그를 사용하고 있기 때문에 개발 환경에서는 H2 웹 콘솔을 정상적으로 사용할 수 있도록 설정
                .headers().frameOptions().sameOrigin()
                // CSRF(Cross-Site Request Forgery) 공격에 대한 Spring Security 에 대한 설정을 비활성화
                .and()
                .csrf().disable()
                //  CORS 설정을 추가 : .cors(withDefaults()) : corsConfigurationSource 으름으로 등록된 Bean 을 사용
                .cors(withDefaults())
                // 스프링 시큐리티 세션을 생성하지 않도록 설정 : 필요에 따라 SessionCreationPolicy 옵션을 통해 세션을 사용할 수도 있다.
                // SessionCreationPolicy.STATELESS : 세션을 생성하지 않으며, SecurityContext 정보를 얻기 위해 결코 세션을 사용하지 않습니다.
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // form 로그인 방식 비활성화 : JSON 포맷을 이용할것이므로
                .formLogin().disable()
                // httpBasic 인증 비활성화 : request 전송마다 username 과 password 를 http header 에 넣어서 인증하는방식
                .httpBasic().disable()
                // 해당 설정들(폼 로그인과 HTTP Basic 인증을 disable)로 인해 해당 인증방식과 관련된 Security Filter 도 함께 비활성화 된다.
                // : UsernamePasswordAuthenticationFilter, BasicAuthenticationFilter

                // 예외처리 핸들러 적용
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())

                // Spring Security 에서는 개발자가 직접 Custom Configurer 를 구성해 Spring Security 의 Configuration 을 커스터마이징(customizations) 할 수 있다.
                // 로그인 담당 custom filter 추가
                .and()
                .apply(new CustomFilterConfigurer())


                // 접근 권한을 부여
                .and()
                .authorizeHttpRequests(
                        authorize -> authorize
                                .antMatchers(HttpMethod.POST, "/members").permitAll()
                                .antMatchers(HttpMethod.POST, "/members/password").permitAll()
                                .antMatchers(HttpMethod.POST, "/members/email").permitAll()

                                .antMatchers(HttpMethod.GET, "/logout").hasRole("USER")
                                .antMatchers(HttpMethod.GET, "/members/*").hasRole("USER")
                                .antMatchers(HttpMethod.DELETE, "/members/*").hasRole("USER")
                                .antMatchers(HttpMethod.PATCH, "/members/*").hasRole("USER")
                                .antMatchers(HttpMethod.PATCH, "/members/*/password").hasRole("USER")
                                .antMatchers(HttpMethod.GET, "/members/*/questions").hasRole("USER")
                                .antMatchers(HttpMethod.GET, "/members/*/answers").hasRole("USER")

                                .antMatchers(HttpMethod.POST, "/questions").hasRole("USER")
                                .antMatchers(HttpMethod.POST, "/answers/*/comment").hasRole("USER")
                                .antMatchers(HttpMethod.POST, "/questions/*/answers").hasRole("USER")
                                .anyRequest().permitAll()
                );
        return http.build();
    }

    // Custom Configurer : CustomFilterConfigurer 는 직접 구현한 필터인 JwtAuthenticationFilter 를 등록하는 역할
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        // AbstractHttpConfigurer 를 상속하여 구현
        // AbstractHttpConfigurer<AbstractHttpConfigurer 를 상속하는 타입, HttpSecurityBuilder 를 상속하는 타입> 을 지정

        // configure() 메서드를 오버라이드해서 Configuration 을 커스터마이징
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            // getSharedObject() 를 통해서 Spring Security 의 설정을 구성하는 SecurityConfigurer 간에 공유되는 객체를 획득가능
            // getSharedObject(AuthenticationManager.class)를 통해 AuthenticationManager 객체 획득
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            // JwtAuthenticationFilter 생성
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, cookieManager, refreshService);

            // setFilterProcessesUrl() 메서드를 통해 디폴트 request URL 인 “/login” 에서 지정하는 URL 로 변경
            jwtAuthenticationFilter.setFilterProcessesUrl("/login");

            // 추가 처리 Custom Handler 를 필터에 등록
            // 다른 필터에서 사용될 일이 없으므로 Bean 으로 등록하지 않고 new 키워드를 통해 직접 생성한다.
            // (다른 필터에서도 각각 성공, 실패 추가처리를 위해 Custom Handler 를 등록할 것이기 때문 )
            // 성공 추가 핸들러는 JwtAuthenticationFilter 에서 호출 로직을 추가해야한다.
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            // 실패 추가 핸들러는 별도의 코드 작성 없이 인증 실패 시 자동 호출된다.
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            // JwtVerificationFilter 인스턴스 생성 및 DI
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            // Spring Security Filter Chain 에 JwtAuthenticationFilter 추가
            builder
                    .addFilter(jwtAuthenticationFilter)
                    // jwtVerificationFilter 가 JwtAuthenticationFilter 가 수행된 바로 다음에 동작하도록 설정
                    // 따라서 인증과정이 수행된 후 인가과정 : jwtVerificationFilter 가 수행된다.
            //        .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class)
            ;
        }
    }

    // PasswordEncoder Bean 객체 생성
    @Bean
    public PasswordEncoder passwordEncoder() {
        // DelegatingPasswordEncoder 는 Spring Security 에서 지원하는 PasswordEncoder 구현 객체를 생성해주는 컴포넌트로써
        // DelegatingPasswordEncoder 를 통해 애플리케이션에서 사용할 PasswordEncoder 를 결정하고,
        // 결정된 PasswordEncoder 로 사용자가 입력한 패스워드를 단방향으로 암호화 해준다.
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // CorsConfigurationSource Bean 객체 생성
    // 구체적인 CORS 정책을 설정
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // 모든 출처(Origin) 에 대한 스크립트 기반의 HTTP 통신을 허용
        configuration.setAllowedOrigins(Arrays.asList("*"));
        // 파라미터로 지정한 HTTP Method 에 대한 HTTP 통신을 허용
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));
        // CorsConfigurationSource 인터페이스의 구현 클래스 생성
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        //  모든 URL 에 앞에서 구성한 CORS 정책(CorsConfiguration)을 적용
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}