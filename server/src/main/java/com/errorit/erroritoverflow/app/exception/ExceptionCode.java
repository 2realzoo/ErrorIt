package com.errorit.erroritoverflow.app.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    USER_NOT_FOUND(404, "User not found"),
    USER_EXISTS(409, "User exists"),
    USER_RESIGNED(422, "User resigned"),
    QUESTION_NOT_FOUND(404, "Question not found"),
    QUESTION_CODE_EXISTS(409,"Question already exists"),
    USER_UNAUTHORIZED(403, "User unauthorized"),
    ANSWER_NOT_FOUND(404,"Answer not found"),
    COMMENT_NOT_FOUND(404,"comment not found"),
    ;
    private final int status;
    private final String message;

    ExceptionCode(int statusCode, String message) {
        this.status = statusCode;
        this.message = message;
    }
}