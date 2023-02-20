package com.errorit.erroritoverflow.app.member.controller;

import com.errorit.erroritoverflow.app.member.dto.*;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/member", produces = MediaType.APPLICATION_JSON_VALUE)
public class MemberController {

    @PostMapping
    public void signUp(@RequestBody SignUpDto signUpDto) {

    }

    @GetMapping("/{memberId}")
    public MemberDto getMemberInfo(@PathVariable String memberId) {
        return MemberDto.builder().build();
    }

    @DeleteMapping("/{memberId}")
    public void deleteMember(@PathVariable String memberId) {

    }

    @PatchMapping("/{memberId}")
    public MemberDto updateMember(@PathVariable String memberId, @RequestBody UpdateMemberDto updateMemberDto
    ) {
        return MemberDto.builder().build();

    }

    @PatchMapping("/password")
    public void updatePassword(@RequestBody PasswordDto passwordDto) {

    }

    @PostMapping("/email")
    public boolean checkEmailDuplicate(@RequestBody EmailDto emailDto) {
        return false;
    }

}
