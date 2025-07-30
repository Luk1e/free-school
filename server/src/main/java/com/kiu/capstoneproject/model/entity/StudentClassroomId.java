package com.kiu.capstoneproject.model.entity;


import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentClassroomId implements Serializable {
    private Long userId;
    private Long classroomId;
}