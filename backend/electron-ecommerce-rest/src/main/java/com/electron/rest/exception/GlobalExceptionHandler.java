package com.electron.rest.exception;

import com.electron.rest.dto.ErrorDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {


    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid
            (MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            errors.put(((FieldError) error).getField(),
                    error.getDefaultMessage());
        });

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDto> handleGlobalException(Exception exception, WebRequest webRequest) {

        ErrorDto errorDto = new ErrorDto(
                exception.getMessage(),
                new Date(),
                webRequest.getDescription(false));

        return new ResponseEntity<>(errorDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorDto> handleApiException(Exception exception, WebRequest webRequest) {

        ErrorDto errorDto = new ErrorDto(
                exception.getMessage(),
                new Date(),
                webRequest.getDescription(false));

        return new ResponseEntity<>(errorDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorDto> handleAccessDeniedException(AccessDeniedException exception, WebRequest webRequest) {

        ErrorDto errorDto = new ErrorDto(
                exception.getMessage(),
                new Date(),
                webRequest.getDescription(false));

        return new ResponseEntity<>(errorDto, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorDto> handleUnauthorisedException(UnauthorizedException exception, WebRequest webRequest) {

        ErrorDto errorDto = new ErrorDto(
                exception.getMessage(),
                new Date(),
                webRequest.getDescription(false));

        return new ResponseEntity<>(errorDto, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(RefreshTokenException.class)
    public ResponseEntity<ErrorDto> handleRefreshTokenException(RefreshTokenException exception, WebRequest webRequest) {

        ErrorDto errorDto = new ErrorDto(
                exception.getMessage(),
                new Date(),
                webRequest.getDescription(false));

        return new ResponseEntity<>(errorDto, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(EmailAlreadyExistException.class)
    public ResponseEntity<ErrorDto> handleUserAlreadyExistException
            (EmailAlreadyExistException exception, WebRequest webRequest) {

        ErrorDto errorDto = new ErrorDto(
                exception.getMessage(),
                new Date(),
                webRequest.getDescription(false));

        return new ResponseEntity<>(errorDto, HttpStatus.CONFLICT);
    }
}
