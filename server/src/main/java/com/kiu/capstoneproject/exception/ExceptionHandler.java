package com.kiu.capstoneproject.exception;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class ExceptionHandler {

    @org.springframework.web.bind.annotation.ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        List<String> errors = new ArrayList<>();

        ex.getAllErrors().forEach(err -> errors.add(err.getDefaultMessage()));

        Map<String, List<String>> result = new HashMap<>();
        result.put("errors", errors);

        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<?> handleAlreadyExistsExceptions(Exception ex) {
        List<String> errors = new ArrayList<>();
        errors.add(ex.getMessage());

        Map<String, List<String>> result = new HashMap<>();
        result.put("errors", errors);

        return new ResponseEntity<>(result, HttpStatus.CONFLICT);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler({
            IncorrectPasswordException.class,
            IncorrectCredentialsException.class,})
    public ResponseEntity<?> handleCustomExceptions(Exception ex) {
        List<String> errors = new ArrayList<>();
        errors.add(ex.getMessage());

        Map<String, List<String>> result = new HashMap<>();
        result.put("errors", errors);

        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler({
            NotFoundException.class,
            EmptyResultSetException.class,
            TokenExpiredException.class
    })
    public ResponseEntity<?> handleNotFoundExceptions(Exception ex) {
        List<String> errors = new ArrayList<>();
        errors.add(ex.getMessage());

        Map<String, List<String>> result = new HashMap<>();
        result.put("errors", errors);

        return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
    }
}