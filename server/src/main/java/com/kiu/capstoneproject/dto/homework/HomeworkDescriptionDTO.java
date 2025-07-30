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
public class HomeworkDescriptionDTO {
    private Long homeworkId;
    private String title;
    // for student
    private Integer grade;
    private Integer totalGrade;
    private HomeworkStatus status;
    // for teacher
    private Integer studentNumber;
    private Integer submittedNumber;
}
