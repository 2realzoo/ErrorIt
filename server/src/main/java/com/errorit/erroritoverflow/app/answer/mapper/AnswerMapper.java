package com.errorit.erroritoverflow.app.answer.mapper;

import com.errorit.erroritoverflow.app.answer.dto.AnswerDto;
import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.comment.dto.CommentDto;
import com.errorit.erroritoverflow.app.comment.entity.Comment;
import com.errorit.erroritoverflow.app.common.pagenation.PageInfo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring" ,unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {

    Answer answerPostDtoToAnswer(AnswerDto.Post post);
    Answer answerPatchDtoToAnswer(AnswerDto.Patch patch);

    @Mapping(source = "member.name", target = "member")
    default AnswerDto.AnswerResponse answerToResponseDto(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        AnswerDto.AnswerResponse answerResponse = new AnswerDto.AnswerResponse();
        answerResponse.setMember( answer.getMember().getName());
        answerResponse.setAnswerId( answer.getAnswerId() );
        answerResponse.setCreatedAt( answer.getCreatedAt() );
        answerResponse.setModifiedAt( answer.getModifiedAt() );
        answerResponse.setContent( answer.getContent() );
        answerResponse.setComments(commentListToCommentResponseList(answer.getComments()));

        return answerResponse;
    };

    @Mapping(source = "member.name", target = "member")
    List<AnswerDto.AnswerResponse> answerListToResponseDtoList(List<Answer> answers);

    @Mapping(source = "member.name", target = "member")
    default AnswerDto.MemberAnswerListResponse pageListToMemberAnswerListResponse(Page<Answer> answers){
        AnswerDto.MemberAnswerListResponse response = new AnswerDto.MemberAnswerListResponse();
        response.setPageInfo(PageInfo.of(answers));
        response.setAnswers(answerListToResponseDtoList(answers.getContent()));
        return response;
    }

    @Mapping(source = "member.name", target = "member")
    CommentDto.CommentResponse commentToCommentResponse(Comment comment);

    @Mapping(source = "member.name", target = "member")
    List<CommentDto.CommentResponse> commentListToCommentResponseList(List<Comment> comments);
}
