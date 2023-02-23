package com.errorit.erroritoverflow.app.comment.controller;

import com.errorit.erroritoverflow.app.comment.dto.CommentDto;
import com.errorit.erroritoverflow.app.comment.entity.Comment;
import com.errorit.erroritoverflow.app.comment.mapper.CommentMapper;
import com.errorit.erroritoverflow.app.comment.service.CommentService;
import com.errorit.erroritoverflow.app.common.response.MultiResponseDto;
import com.errorit.erroritoverflow.app.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper mapper;

    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.Post requestDto){
        Comment comment = commentService.createComment(
                mapper.commentPostDtoToComment(requestDto));

        return new ResponseEntity<>(mapper.commentToCommentResponseDto(comment),
                HttpStatus.OK);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                        @RequestBody CommentDto.Patch requestDto){

        requestDto.setCommentId(commentId);
        Comment comment =
                commentService.updateComment(commentId,requestDto);

        return new ResponseEntity<>(mapper.commentToCommentResponseDto(comment)
                ,HttpStatus.OK);
    }

    //1개 댓글
    @GetMapping("/comment-id")
    public ResponseEntity getComment(@PathVariable("comment-id") @Positive long commentId){
        Comment comment = commentService.find(commentId);

        return new ResponseEntity(mapper.commentToCommentResponseDto(comment),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getComments(@Positive @RequestParam int page,
                                      @Positive @RequestParam int size) {
        Page<Comment> pageComments = commentService.findComments(page - 1, size);
        List<Comment> comments = pageComments.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.commentsToCommentsResponseDto(comments),
                        pageComments), HttpStatus.OK);
    }

    

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive long commentId,
                                        @PathVariable(name = "member-id") @Positive long memberId){

        commentService.deleteComment(commentId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
