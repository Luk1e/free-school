package com.kiu.capstoneproject.dto.classroom;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClassroomNameDTO {
    @NotBlank(message = "Classroom name is mandatory.")
    private String name;
}
