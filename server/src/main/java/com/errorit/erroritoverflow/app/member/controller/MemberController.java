package com.errorit.erroritoverflow.app.member.controller;

import com.errorit.erroritoverflow.app.member.dto.*;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.member.mapper.MemberMapper;
import com.errorit.erroritoverflow.app.member.service.MemberService;
import com.errorit.erroritoverflow.app.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@Slf4j
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final String MEMBER_BASIC_URI = "/members";

    // 회원가입
    @PostMapping
    public ResponseEntity<Map<String, Long>> createMember(@RequestBody MemberDto.Create createDto) {
        Member member = memberMapper.createToMember(createDto);
        Member savedMember = memberService.create(member);

        // URI resultUri = UriCreator.createUri(MEMBER_BASIC_URI, savedMember.getId());
        // return ResponseEntity.created(resultUri).build(); // 응답 Location 헤더에 URI 가 담김

        Map<String, Long> response = new HashMap<>();
        response.put("memberId", savedMember.getMemberId());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 단일 회원 조회
    @GetMapping("/{member-id}")
    public ResponseEntity<MemberDto.MemberDetailResponse> findOneMember(@PathVariable("member-id") Long memberId) {
        Member findedMember = memberService.findById(memberId);
        MemberDto.MemberDetailResponse memberDetailResponse = memberMapper.memberToMemberDetailResponse(findedMember);
        return ResponseEntity.ok(memberDetailResponse);
    }

    // 회원 탈퇴
    @DeleteMapping("/{member-id}")
    public ResponseEntity<?> deleteOneMember(@PathVariable("member-id") Long memberId) {
        memberService.delete(memberId);
        return ResponseEntity.ok().build();
    }

    // 회원 수정
    @PatchMapping("/{member-id}")
    public ResponseEntity<MemberDto.MemberDetailResponse> updateMember(@PathVariable("member-id") Long memberId,
                                                                       @RequestBody MemberDto.Update updateDto) {
        Member updateData = memberMapper.updateDtoToMember(updateDto);
        updateData.setMemberId(memberId);
        Member updatedMember = memberService.update(updateData);
        MemberDto.MemberDetailResponse memberDetailResponse = memberMapper.memberToMemberDetailResponse(updatedMember);
        return ResponseEntity.ok(memberDetailResponse);
    }

    // 비밀번호 찾기 시도
    @PostMapping("/password")
    public ResponseEntity<Map<String, Long>> findPassword(@RequestBody MemberDto.FindPassword findPasswordDto) {
        Member findMemberData = memberMapper.findPasswordToMember(findPasswordDto);
        Member findedMember = memberService.checkFindQuestion(findMemberData);

        Map<String, Long> response = new HashMap<>();
        response.put("memberId", findedMember.getMemberId());

        return ResponseEntity.ok(response);
    }

    // 비밀번호 변경
    @PatchMapping("/{member-id}/password")
    public ResponseEntity<Void> updatePassword(@PathVariable("member-id") Long memberId,
                                            @RequestBody MemberDto.UpdatePassword updatePasswordDto) {
        Boolean result = memberService.updatePassword(memberId, updatePasswordDto.getPassword());
        return ResponseEntity.ok().build();
    }

    // 이메일 중복확인
    @PostMapping("/email")
    public ResponseEntity<Map<String, Boolean>> checkEmail(@RequestBody MemberDto.CheckEmail emailDto) {
        Boolean result = memberService.checkCreateEmail(emailDto.getEmail());
        Map<String, Boolean> response = new HashMap<>();
        response.put("canUse", result);
        return ResponseEntity.ok(response);
    }
}
