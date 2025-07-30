package com.kiu.capstoneproject.dto.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class StrongPasswordValidator implements ConstraintValidator<StrongPassword, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value != null) {
            // check if string contains at least one digit, one lowercase letter, one uppercase letter and min 8 characters long
            return value.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$");
        }

        return false;
    }
}