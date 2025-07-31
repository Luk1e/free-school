package com.freeschool.server.exception;

public class EmptyResultSetException extends RuntimeException {
    public EmptyResultSetException(String message) {
        super(message);
    }
}