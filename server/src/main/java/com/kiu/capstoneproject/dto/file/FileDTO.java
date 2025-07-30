package com.kiu.capstoneproject.dto.file;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileDTO {
    private String name;
    private Long size;
    private String downloadUrl;
}
