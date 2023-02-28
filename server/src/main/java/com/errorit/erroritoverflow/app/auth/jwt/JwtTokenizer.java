package com.errorit.erroritoverflow.app.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

@Slf4j
@Component // Bean 등록
public class JwtTokenizer {

    // JWT 생성시 필요 정보는 application.yml 에서 로드한다.
    @Getter
    @Value("${jwt.key}")
    private String secretKey; // JWT 생성시 필요 정보 : 시크릿 키

    @Getter
    @Value("${jwt.temp-access-token-expiration-minutes}")
    private int tempAccessTokenExpirationMinutes; // JWT 생성시 필요 정보 : Temp AccessToken 만료시간

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes; // JWT 생성시 필요 정보 : AccessToken 만료시간

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes; // JWT 생성시 필요 정보 : Refresh 만료시간

    // Plain Text 형태인 Secret Key 의 byte[] 를 Base64 형식의 문자열로 인코딩 한다.
        // jjwt 가 버전업 되면서
        // Plain Text 자체를 Secret Key 로 사용하는 것은
        // 암호학(cryptographic)적인 작업에 사용되는 Key 가 항상 바이너리(byte array)라는 사실과 맞지 않는 것을 감안하여
        // Plain Text 자체를 Secret Key 로 사용하는 것을 권장하지 않는다.
    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    // Access token 생성 메서드 : 인증된 사용자에서 JWT 를 최초 발급해주기 위핸 JWT 생성 메서드
    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) {

        // Base64 형식 Secret Key 문자열을 이용해 Key 객체 획득
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims) // Custom Claims 추가 : 주로 인증된 사용자와 관련된 정보
                .setSubject(subject) // JWT 제목
                .setIssuedAt(Calendar.getInstance().getTime()) // JWT 발행일자
                .setExpiration(expiration) // JWT 만료일자
                .signWith(key) // 서명을 위한 Key 객체 설정
                .compact(); // JWT 생성 및 직렬화
    }

    // Refresh token 생성 메서드 : Access token 이 만료 되었을 시 사용
    public String generateRefreshToken(String subject, Date expiration, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        // Access Token 을 새로 발급해주는 역할이므로 Custom Claims 는 추가할 필요가 없다.
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    // JWS 에서 키를 통한 검증을 수행하여 claims 를 반환
    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) throws ExpiredJwtException, SignatureException {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        // 내부적으로 서명 검증에 성공 시 Claims 가 정상적으로 파싱된다 -> 검증 메서드는 따로 만들지 않는다.
        // 실패 시 에러 발생
        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws); // 검증 실패시 에러
        return claims;
    }

    // JWT 검증 : 파라미터 jws -> signature 가 포함된 JWT 라는 의미
    public void verifySignature(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key) // signature 검증 : 위/변조 여부 파악
                .build()
                .parseClaimsJws(jws); // Claims 획득
    }

    // JWT의 만료 일시를 지정하기 위한 메서드 : JWT 생성 시 사용
    public Date getTokenExpiration(int expirationMinutes) {

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }

    // JWT 서명에 사용할 SecretKey 생성
        // jjwt 가 버전업 되면서
        // Plain Text 자체를 Secret Key 로 사용하는 것은
        // 암호학(cryptographic)적인 작업에 사용되는 Key 가 항상 바이너리(byte array)라는 사실과 맞지 않는 것을 감안하여
        // Plain Text 자체를 Secret Key 로 사용하는 것을 권장하지 않고 있습니다
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        // Base64 형식으로 인코딩 된 Secret Key를 디코딩 한 후, byte array를 반환
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);

        // key byte array를 기반으로 적절한 HMAC 알고리즘을 적용한 Key(java.security.Key) 객체를 생성
        // jjwt 0.11.5 버전으로 인해 내부적으로 적절한 HMAC 알고리즘을 지정되어 수행된다.
        Key key = Keys.hmacShaKeyFor(keyBytes);
        return key;
    }
}