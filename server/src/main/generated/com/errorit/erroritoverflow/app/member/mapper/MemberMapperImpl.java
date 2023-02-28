package com.errorit.erroritoverflow.app.member.mapper;

import com.errorit.erroritoverflow.app.member.dto.MemberDto;
import com.errorit.erroritoverflow.app.member.entity.Member;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-02-23T13:33:45+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member createDtoToMember(MemberDto.Create create) {
        if ( create == null ) {
            return null;
        }

        Member member = new Member();

        return member;
    }

    @Override
    public Member updateDtoToMember(MemberDto.Update update) {
        if ( update == null ) {
            return null;
        }

        Member member = new Member();

        return member;
    }

    @Override
    public Member findPasswordToMember(MemberDto.FindPassword findPassword) {
        if ( findPassword == null ) {
            return null;
        }

        Member member = new Member();

        return member;
    }

    @Override
    public MemberDto.MemberDetailResponse memberToMemberDetailResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberDto.MemberDetailResponse memberDetailResponse = new MemberDto.MemberDetailResponse();

        return memberDetailResponse;
    }
}
