package com.errorit.erroritoverflow.app.question.mapper;


import com.errorit.erroritoverflow.app.answer.dto.AnswerDto;
import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.comment.dto.CommentDto;
import com.errorit.erroritoverflow.app.comment.entity.Comment;
import com.errorit.erroritoverflow.app.common.pagenation.PageInfo;
import com.errorit.erroritoverflow.app.member.entity.Member;
import com.errorit.erroritoverflow.app.question.dto.QuestionDto;
import com.errorit.erroritoverflow.app.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {

    //질문 등록
    Question questionPostDtoToEntity(QuestionDto.Post requestBody);

    //질문 수정
    Question questionPatchDtoToEntity(QuestionDto.Patch requestBody);

    //질문 하나 조회
    @Mapping(source = "member.name", target = "member")
    //QuestionDto.QuestionDetailResponse questionToResponseDto(Question question);
    default QuestionDto.QuestionDetailResponse questionToResponseDto(Question question) {
        if (question == null ) {
            return null;
        }
        QuestionDto.QuestionDetailResponse questionResponse = new QuestionDto.QuestionDetailResponse();
        questionResponse.setQuestionId(question.getQuestionId());
        questionResponse.setTitle(question.getTitle());
        questionResponse.setCreatedAt( question.getCreatedAt() );
        questionResponse.setModifiedAt( question.getModifiedAt() );
        questionResponse.setMember(question.getMember().getName()); //닉네임
        questionResponse.setContent( question.getContent() );//내용
        questionResponse.setViewCount(question.getViewCount());
        //questionResponse.setComments(commentListToCommentResponseList(question.getComments()));

        return questionResponse;
    };



    //질문 목록 조회
    @Mapping(source = "member.name", target = "member")
    QuestionDto.QuestionListResponse questionListToResponseDto(Question question);

    default List<QuestionDto.QuestionListResponse> questionListToResponseDtoList(Page<Question> questions) {
        return questions.stream()
                .map(this::questionListToResponseDto)
                .collect(Collectors.toList());
    }

    @Mapping(source = "member.name", target = "member")
    default QuestionDto.MemberQuestionListResponse pageListToMemberQuestionListResponse(Page<Question> questions){
        QuestionDto.MemberQuestionListResponse response = new QuestionDto.MemberQuestionListResponse();
        response.setPageInfo(PageInfo.of(questions));//페이징 정보

        //questions 객체가 null인지 확인
        if (questions != null && questions.hasContent()) {
            response.setQuestions(questionListToResponseDtoList(questions));
        } else {
            response.setQuestions(Collections.emptyList());
        }
        return response;
    }
    
    //회원이 작성한 질문
    //QuestionDto.MemberQuestionListResponse pageListToMemberQuestionListResponse(Page<Question> questions);

//    @Mapping(source = "member.name", target = "member")
//    List<CommentDto.CommentResponse> commentListToCommentResponseList(List<Comment> comments);

}

