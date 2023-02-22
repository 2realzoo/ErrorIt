package com.errorit.erroritoverflow.app.member.dto;

import com.errorit.erroritoverflow.app.common.pagenation.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class MemberDto {

    // 회원가입
    @Getter
    @Setter
    public static class Create {
        private String name;
        private String email;
        private String password;
        private String findQuestion;
        private String findAnswer;
    }

    // 회원 정보 수정
    @Getter
    @Setter
    public static class Update {
        private String name;
        private String intro;
    }

    // 비밀번호 찾기
    @Getter
    @Setter
    public static class FindPassword {
        private String email;
        private String findQuestion;
        private String findAnswer;
    }

    // 비밀번호 변경
    @Getter
    @Setter
    public static class UpdatePassword {
        private Long memberId;
        private String password;
    }

    // 이메일 중복확인 요청
    @Getter
    @Setter
    public static class CheckEmail {
        private String email;
    }

    // 단일 회원 조회
    @Getter
    @Setter
    @AllArgsConstructor
    public static class MemberDetailResponse {
        private Long memberId;
        private String imageUrl;
        private String intro;
        private String name;
        private String email;
    }

    // 처리 결과
    @Getter
    @Setter
    @AllArgsConstructor
    public static class ResultResponse {
        private Boolean result;
    }

    // 회원 작성 질문 목록
    @Getter
    @Setter
    @AllArgsConstructor
    public static class MemberQuestionsResponse {
        private PageInfo pageInfo;
        private List<MemberQuestionsDto> questions;
    }

    // 회원 작성 답변 목록
    @Getter
    @Setter
    @AllArgsConstructor
    public static class MemberAnswersResponse {
        private PageInfo pageInfo;
        private List<MemberAnswersDto> answers;
    }
}
