package com.kiu.capstoneproject.dto.classroom;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClassroomDTO {
    private Long classroomId;
    private String name;
}
