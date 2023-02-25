package com.errorit.erroritoverflow.app.member.service;

import com.errorit.erroritoverflow.app.auth.CustomAuthorityUtils;
import com.errorit.erroritoverflow.app.exception.BusinessLogicException;
import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import com.errorit.erroritoverflow.app.image.entity.Image;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    // 디폴트 이미지 URI
    @Value("${image.default-image.uri}")
    private String DEFAULT_IMAGE_URI;

    // 회원 Create
    public Member create(Member member) {

        Boolean checkResult = checkCreateEmail(member.getEmail());
        if (!checkResult) {
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
        }

        Image image = new Image();
        image.setUrl(DEFAULT_IMAGE_URI);
        member.setImage(image);

        // 비밀번호 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // 권한 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    // 회원 단일 조회
    public Member findById(Long memberId){
        return findVerifyMemberById(memberId);
    }

    // 회원 Update
    public Member update(Member updateMember){
        Member originalMember = findVerifyMemberById(updateMember.getId());
        Optional.ofNullable(updateMember.getName())
                .ifPresent(originalMember::setName);
        Optional.ofNullable(updateMember.getIntro())
                .ifPresent(originalMember::setIntro);

        return memberRepository.save(originalMember);
    }

    // 회원 Delete
    public Long delete(Long memberId) {
        Member findedMember = findVerifyMemberById(memberId);
        memberRepository.deleteById(findedMember.getId());
        return memberId;
    }

    // 비밀번호 찾기
    public Member checkFindQuestion(Member findMemberData) {
        Member findedMember = findVerifyMemberByEmail(findMemberData.getEmail());
        if (findedMember.getFindQuestion().equals(findMemberData.getFindQuestion())
                || findedMember.getFindAnswer().equals(findMemberData.getFindAnswer())
        ) {
            throw new BusinessLogicException(ExceptionCode.AUTHORIZED_FAIL);
        }
        return findedMember;
    }

    // 비밀번호 변경
    public Boolean updatePassword(Long memberId, String newPassword) {
        Member findedMember = findVerifyMemberById(memberId);

        // 비밀번호 암호화
        String encryptedPassword = passwordEncoder.encode(newPassword);
        findedMember.setPassword(encryptedPassword);

        memberRepository.save(findedMember);
        return true;
    }

    // 이메일 중복 확인
    public Boolean checkCreateEmail(String email) {
        Optional<Member> memberOptional = memberRepository.findByEmail(email);
        return memberOptional.isEmpty();
    }

    // Id 로 회원 검색
    private Member findVerifyMemberById(Long memberId) {
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if (memberOptional.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
        return memberOptional.get();
    }

    // 이메일 로 회원 검색
    private Member findVerifyMemberByEmail(String email) {
        Optional<Member> memberOptional = memberRepository.findByEmail(email);
        if (memberOptional.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
        return memberOptional.get();
    }

}
