package com.freeschool.server.dto.homework;

import com.freeschool.server.dto.file.FileDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HomeworkResponseDTO {
    private String title;
    private String instruction;
    private Integer totalGrade;
    private FileDTO homeworkFile;
}
