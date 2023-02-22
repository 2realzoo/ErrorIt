package com.errorit.erroritoverflow.app.member.mapper;

import com.errorit.erroritoverflow.app.member.dto.MemberDto;
import com.errorit.erroritoverflow.app.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)

public interface MemberMapper {

    // create -> member
    Member createDtoToMember(MemberDto.Create create);

    // update -> member
    Member updateDtoToMember(MemberDto.Update update);

    // findPassword -> member
    Member findPasswordToMember(MemberDto.FindPassword findPassword);

    // member -> MemberDetailResponse
    MemberDto.MemberDetailResponse memberToMemberDetailResponse(Member member);

}
