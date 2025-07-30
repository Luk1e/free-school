package com.kiu.capstoneproject.dto.homework;

import com.kiu.capstoneproject.enums.HomeworkStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentHomeworkDTO {
    private Long studentId;
    private String firstName;
    private String lastName;
    private Integer grade;
    private HomeworkStatus status;
}
