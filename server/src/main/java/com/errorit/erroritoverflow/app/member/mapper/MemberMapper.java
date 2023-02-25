package com.errorit.erroritoverflow.app.member.mapper;

import com.errorit.erroritoverflow.app.member.dto.MemberDto;
import com.errorit.erroritoverflow.app.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    // create -> member
    Member createToMember(MemberDto.Create create);

    // update -> member
    Member updateDtoToMember(MemberDto.Update update);

    // findPassword -> member
    Member findPasswordToMember(MemberDto.FindPassword findPassword);

    // member -> MemberDetailResponse
    @Mapping(target = "memberId", source = "id")
    @Mapping(target = "imageUrl", source = "image.url")
    MemberDto.MemberDetailResponse memberToMemberDetailResponse(Member member);
}
