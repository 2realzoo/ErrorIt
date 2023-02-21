package com.errorit.erroritoverflow.app.member.controller;

import com.errorit.erroritoverflow.app.member.dto.*;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/member", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class MemberController {

    private final MemberRepository memberRepository;

    @PostMapping
    public void signUp(@RequestBody SignUpDto signUpDto) {
        memberRepository.save(signUpDto.toMember());
    }

    @GetMapping("/{memberId}")
    public MemberDto getMemberInfo(@PathVariable Long memberId) {
        return MemberDto.toDto(memberRepository.findById(memberId).orElse(Member.builder().build()));
    }

    @DeleteMapping("/{memberId}")
    public void deleteMember(@PathVariable Long memberId) {
        memberRepository.deleteById(memberId);
    }

    @PatchMapping("/{memberId}")
    public MemberDto updateMember(@PathVariable Long memberId,
                                  @RequestBody UpdateMemberDto updateMemberDto) {
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if(memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setName(updateMemberDto.getName());
            member.setIntro(updateMemberDto.getIntro());
            return MemberDto.toDto(memberRepository.save(member));
        }

        return MemberDto.of();
    }

    @PatchMapping("/password")
    public void updatePassword(@RequestBody PasswordDto passwordDto) {
        Optional<Member> memberOptional = memberRepository.findById(passwordDto.getMemberId());
        if(memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setPassword(passwordDto.getPassword());
            memberRepository.save(member);
        }
    }

    @PostMapping("/email")
    public boolean checkEmailDuplicate(@RequestBody EmailDto emailDto) {
        List<Member> members = memberRepository.findAllByEmail(emailDto.getEmail());
        return members.isEmpty();
    }

}
