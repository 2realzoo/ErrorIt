package com.errorit.erroritoverflow.app.comment.mapper;

import com.errorit.erroritoverflow.app.comment.dto.CommentDto;
import com.errorit.erroritoverflow.app.comment.entity.Comment;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-02-23T13:33:45+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class CommentMapperImpl implements CommentMapper {

    @Override
    public Comment commentPostDtoToComment(CommentDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Comment comment = new Comment();

        return comment;
    }

    @Override
    public Comment commentPatchDtoToComment(CommentDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Comment comment = new Comment();

        return comment;
    }

    @Override
    public CommentDto.Response commentToCommentResponseDto(Comment comment) {
        if ( comment == null ) {
            return null;
        }

        CommentDto.Response response = new CommentDto.Response();

        return response;
    }
}
