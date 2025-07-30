package com.kiu.capstoneproject.dto.homework;

import com.kiu.capstoneproject.dto.file.FileDTO;
import com.kiu.capstoneproject.model.entity.File;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

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
