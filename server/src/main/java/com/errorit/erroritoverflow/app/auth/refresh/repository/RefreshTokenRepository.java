package com.errorit.erroritoverflow.app.auth.refresh.repository;


import com.errorit.erroritoverflow.app.auth.refresh.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByMember_MemberId(Long memberId);
}
