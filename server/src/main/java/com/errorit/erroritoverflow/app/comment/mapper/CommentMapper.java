package com.errorit.erroritoverflow.app.comment.mapper;

import com.errorit.erroritoverflow.app.answer.dto.AnswerDto;
import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.comment.dto.CommentDto;
import com.errorit.erroritoverflow.app.comment.entity.Comment;
import com.errorit.erroritoverflow.app.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {

    Comment commentPostDtoToComment(CommentDto.Post requestBody);
    Comment commentPatchDtoToComment(CommentDto.Patch requestBody);
    //CommentDto.Response commentToCommentResponseDto(Comment comment);

    default CommentDto.Response commentToCommentResponseDto(Comment comment) {
        Member member = comment.getMember();

        return CommentDto.Response.builder()
                .commentId(comment.getCommentId())
                .memberId(comment.getMember().getId())
                .member(comment.getMember().getName())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getModifiedAt())
                .build();
    }

    List<CommentDto.Response> commentsToCommentsResponseDto(List<Comment> comments);
}
