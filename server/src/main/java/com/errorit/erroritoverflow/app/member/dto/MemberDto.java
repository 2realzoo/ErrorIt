package com.errorit.erroritoverflow.app.member.dto;

import com.errorit.erroritoverflow.app.image.entity.Image;
import com.errorit.erroritoverflow.app.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Getter
@NoArgsConstructor(staticName = "of")
public class MemberDto {
    private Long memberId;
    private String url;
    private String intro;
    private String name;
    private String email;

    private MemberDto(Member member) {
        this.memberId = member.getId();
        this.url = Optional.of(member).map(Member::getImage).map(Image::getUrl).orElse(null);
        this.intro = member.getIntro();
        this.name = member.getName();
        this.email = member.getEmail();
    }

    public static MemberDto toDto(Member member) {
        return new MemberDto(member);
    }
}
