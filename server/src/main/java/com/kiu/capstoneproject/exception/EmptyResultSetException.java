package com.kiu.capstoneproject.exception;

public class EmptyResultSetException extends RuntimeException {
    public EmptyResultSetException(String message) {
        super(message);
    }
}