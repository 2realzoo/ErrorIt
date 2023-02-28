package com.errorit.erroritoverflow.app.comment.controller;

import com.errorit.erroritoverflow.app.comment.dto.CommentDto;
import com.errorit.erroritoverflow.app.comment.entity.Comment;
import com.errorit.erroritoverflow.app.comment.mapper.CommentMapper;
import com.errorit.erroritoverflow.app.comment.service.CommentService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper mapper;

    // 댓글 작성 : POST : /questions/{question-id}/comments   : memberId, comment  : return commentId, content, member(닉네임), createAt
    @PostMapping("/questions/{question-id}/comments")
    public ResponseEntity<CommentDto.CommentResponse> createQuestionComment(@PathVariable("question-id") Long questionId,
                                                   @RequestBody CommentDto.Post commentDto){
        Comment comment = mapper.commentPostDtoToComment(commentDto);
        Comment savedComment = commentService.createByQuestionId(comment, commentDto.getMemberId(), questionId);
        CommentDto.CommentResponse commentResponse = mapper.CommentToResponse(savedComment);
        return new ResponseEntity<>(commentResponse, HttpStatus.CREATED);
    }

    // 댓글 작성 : POST : /answers/{answer-id}/comments   : memberId, comment  : return commentId, content, member(닉네임), createAt
    @PostMapping("/answers/{answer-id}/comments")
    public ResponseEntity<CommentDto.CommentResponse> createAnswerComment(@PathVariable("answer-id") Long answerId,
                                                 @RequestBody CommentDto.Post commentDto) {
        Comment comment = mapper.commentPostDtoToComment(commentDto);
        Comment savedComment = commentService.createByAnswerId(comment, commentDto.getMemberId(), answerId);
        CommentDto.CommentResponse commentResponse = mapper.CommentToResponse(savedComment);
        return new ResponseEntity<>(commentResponse, HttpStatus.CREATED);
    }

    // 댓글 수정
    @PatchMapping("/comments/{comment-id}")
    public ResponseEntity<CommentDto.CommentResponse> updateComment(@PathVariable("comment-id") Long commentId,
                                           @RequestBody CommentDto.Patch commentDto) {
        Comment comment = mapper.commentPatchDtoToComment(commentDto);
        comment.setCommentId(commentId);
        Comment updatedComment = commentService.update(comment, commentDto.getMemberId());
        CommentDto.CommentResponse commentResponse = mapper.CommentToResponse(updatedComment);
        return ResponseEntity.ok().body(commentResponse);
    }

    // 댓글 삭제
    @DeleteMapping("/comments/{comment-id}")
    public ResponseEntity<Map<String, Long>> deleteComment(@PathVariable("comment-id") Long commentId,
                                                           HttpServletRequest request) {
        Long tokenMemberId = ((Number) request.getAttribute("tokenMemberId")).longValue();
        Long deletedCommentId = commentService.delete(commentId,tokenMemberId);

        Map<String, Long> response = new HashMap<>();
        response.put("deletedCommentId", deletedCommentId);
        return ResponseEntity.ok().body(response);
    }
}
