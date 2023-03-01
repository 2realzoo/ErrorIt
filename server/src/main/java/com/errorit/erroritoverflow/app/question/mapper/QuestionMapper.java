package com.errorit.erroritoverflow.app.question.mapper;


import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.comment.dto.CommentDto;
import com.errorit.erroritoverflow.app.comment.entity.Comment;
import com.errorit.erroritoverflow.app.common.pagenation.PageInfo;
import com.errorit.erroritoverflow.app.question.dto.QuestionDto;
import com.errorit.erroritoverflow.app.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {

    //질문 등록
    Question questionPostDtoToEntity(QuestionDto.Post post);

    //질문 수정
    Question questionPatchDtoToEntity(QuestionDto.Patch patch);

    //질문 상세 조회
    default QuestionDto.QuestionDetailResponse questionToQuestionDetailResponse(Question question){
        if ( question == null ) {
            return null;
        }
        QuestionDto.QuestionDetailResponse response = new QuestionDto.QuestionDetailResponse();
        response.setQuestionId(question.getQuestionId());
        // ownerId(작성자회원Id) 필드를 추가
        response.setOwnerId(question.getMember().getMemberId());
        response.setTitle(question.getTitle());
        response.setContent(question.getContent());
        response.setOwnerName(question.getMember().getName());
        response.setViewCount(question.getViewCount());
        response.setCreatedAt(question.getCreatedAt());
        response.setModifiedAt(question.getModifiedAt());
        response.setComments(commentListToCommentsResponseDtoList(question.getComments()));
        return response;
    };

    // 질문 목록에 포함되는 질문 dto
    default QuestionDto.QuestionElementResponse questionToQuestionElementResponse(Question question) {
        if ( question == null ) {
            return null;
        }
        QuestionDto.QuestionElementResponse response = new QuestionDto.QuestionElementResponse();
        response.setQuestionId(question.getQuestionId());
        response.setTitle(question.getTitle());
        response.setContent(question.getContent());
        // ownerId(작성자회원Id) 필드를 추가
        response.setOwnerId(question.getMember().getMemberId());
        response.setOwnerName(question.getMember().getName());
        response.setViewCount(question.getViewCount());
        response.setCreatedAt(question.getCreatedAt());
        response.setModifiedAt(question.getModifiedAt());
        response.setAnswers(question.getAnswers().size());
        return response;
    };

    //질문리스트 -> 질문목록응답에 포함될 응답객체리스트
    @Mapping(target = "ownerName", source = "member.name")
    @Mapping(target = "ownerId", source = "member.memberId")
    List<QuestionDto.QuestionElementResponse> questionsToQuestionElementList(List<Question> questions);

    // Page<Question> -> PageQuestionListResponse
    @Mapping(target = "ownerName", source = "member.name")
    @Mapping(target = "ownerId", source = "member.memberId")
    default QuestionDto.PageQuestionListResponse pageListToPageQuestionListResponse(Page<Question> questions) {
        if ( questions == null ) {
            return null;
        }
        QuestionDto.PageQuestionListResponse response = new QuestionDto.PageQuestionListResponse();
        response.setPageInfo(PageInfo.of(questions));
        response.setQuestions(questionsToQuestionElementList(questions.getContent()));
        return response;
    }

    // 댓글 -> 댓글 응답객체
    @Mapping(target = "ownerName", source = "member.name")
    @Mapping(target = "ownerId", source = "member.memberId")
    CommentDto.CommentResponse CommentToResponse(Comment comment);

    // 댓글 리스트 -> 댓글 응답객체 리스트
    @Mapping(target = "ownerName", source = "member.name")
    @Mapping(target = "ownerId", source = "member.memberId")
    List<CommentDto.CommentResponse> commentListToCommentsResponseDtoList(List<Comment> comments);

}

