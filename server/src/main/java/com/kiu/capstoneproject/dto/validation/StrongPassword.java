package com.kiu.capstoneproject.dto.validation;

import java.lang.annotation.*;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Constraint(validatedBy = StrongPasswordValidator.class)
@Target({ ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface StrongPassword {
    String message() default "Password must be 8 characters long and combination of uppercase letters, lowercase letters and numbers";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}