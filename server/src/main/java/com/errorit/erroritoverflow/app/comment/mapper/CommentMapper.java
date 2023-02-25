package com.errorit.erroritoverflow.app.comment.mapper;

import com.errorit.erroritoverflow.app.answer.dto.AnswerDto;
import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.comment.dto.CommentDto;
import com.errorit.erroritoverflow.app.comment.entity.Comment;
import com.errorit.erroritoverflow.app.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {

    Comment commentPostDtoToComment(CommentDto.Post post);

    Comment commentPatchDtoToComment(CommentDto.Patch patch);

    @Mapping(target = "member", source = "member.name")
    CommentDto.CommentResponse CommentToResponse(Comment comment);

    @Mapping(target = "member", source = "member.name")
    List<CommentDto.CommentResponse> commentListToCommentsResponseDtoList(List<Comment> comments);
}
