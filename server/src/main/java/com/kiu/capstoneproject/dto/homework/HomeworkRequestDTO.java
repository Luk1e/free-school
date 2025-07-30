package com.kiu.capstoneproject.dto.homework;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HomeworkRequestDTO {
    private String title;
    private String instruction;
    private Integer totalGrade;
    private MultipartFile file;
}
