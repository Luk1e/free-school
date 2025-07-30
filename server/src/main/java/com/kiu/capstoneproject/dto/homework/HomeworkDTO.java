package com.kiu.capstoneproject.dto.homework;

import com.kiu.capstoneproject.dto.file.FileDTO;
import com.kiu.capstoneproject.enums.HomeworkStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HomeworkDTO {
    private Long homeworkId;
    private String title;
    private String instruction;
    private Integer grade;
    private Integer totalGrade;
    private FileDTO homeworkFile;
    private FileDTO solutionFile;
    private HomeworkStatus status;
}
