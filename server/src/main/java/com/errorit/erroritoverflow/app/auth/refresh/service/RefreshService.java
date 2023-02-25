package com.errorit.erroritoverflow.app.auth.refresh.service;

import com.errorit.erroritoverflow.app.auth.refresh.entity.RefreshToken;
import com.errorit.erroritoverflow.app.auth.refresh.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RequiredArgsConstructor
@Service
public class RefreshService {
    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshToken saveOrUpdate(RefreshToken refreshToken) {
        RefreshToken findedRefreshToken = findByMemberId(refreshToken.getMember().getMemberId());
        if (findedRefreshToken != null) {
            return update(refreshToken);
        } else {
            return save(refreshToken);
        }
    }

    private RefreshToken save(RefreshToken refreshToken) {
        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken findByMemberId(Long memberId) {
        return refreshTokenRepository.findByMember_MemberId(memberId).orElse(null);
    }

    private RefreshToken update(RefreshToken refreshToken) {
        RefreshToken originalRefreshToken = findByMemberId(refreshToken.getMember().getMemberId());
        originalRefreshToken.setKeyValue(refreshToken.getKeyValue());
        return refreshTokenRepository.save(originalRefreshToken);
    }

    private void delete(Long memberId) {
        RefreshToken refreshToken = findByMemberId(memberId);
        if (refreshToken != null) {
            refreshTokenRepository.deleteById(refreshToken.getRefreshTokenId());
        }
    }
}
