package com.errorit.erroritoverflow.app.member.service;

import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    // 회원 CRUD
    // 회원 Create

    // 회원 단일 조회
    public Member findById(Long memberId){
        Member member1 = new Member();
        return member1;
    }

    // 회원 목록 조회

    // 회원 Update
    public Member updateMember(Member member){
        Member member1 = new Member();
        return member1;
    }

    // 회원 Delete
    public void deleteMember(Long memberId) {
        memberRepository.deleteById(memberId);
    }



    // 비밀번호 찾기

    // 이메일 중복 확인

}
