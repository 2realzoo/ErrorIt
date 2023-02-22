package com.errorit.erroritoverflow.app.comment.mapper;

import com.errorit.erroritoverflow.app.comment.dto.CommentDto;
import com.errorit.erroritoverflow.app.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {

    Comment commentPostDtoToComment(CommentDto.Post requestBody);
    Comment commentPatchDtoToComment(CommentDto.Patch requestBody);
    CommentDto.Response commentToCommentResponseDto(Comment comment);
}
