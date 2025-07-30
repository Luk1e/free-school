package com.kiu.capstoneproject.exception;

public class IncorrectCredentialsException extends RuntimeException {
    public IncorrectCredentialsException(String message) {
        super(message);
    }
}