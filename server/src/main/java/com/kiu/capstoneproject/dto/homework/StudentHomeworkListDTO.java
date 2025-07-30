package com.kiu.capstoneproject.dto.homework;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentHomeworkListDTO {
    private String title;
    private Integer totalGrade;
    private List<StudentHomeworkDTO> studentHomeworkDTOS;
}
