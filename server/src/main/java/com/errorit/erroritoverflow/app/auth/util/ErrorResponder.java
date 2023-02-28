package com.errorit.erroritoverflow.app.auth.util;

import com.errorit.erroritoverflow.app.exception.ExceptionCode;
import com.errorit.erroritoverflow.app.response.ErrorResponse;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// ErrorResponse 를 출력스트림으로 생성하는 역할
public class ErrorResponder {
    public static void sendErrorResponseByStatus(HttpServletResponse response, HttpStatus status) {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        try {
            response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void sendErrorResponseByExceptionCode(HttpServletResponse response, ExceptionCode exceptionCode){
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(exceptionCode);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(errorResponse.getStatus());
        try {
            response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
