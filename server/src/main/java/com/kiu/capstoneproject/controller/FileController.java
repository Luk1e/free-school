package com.kiu.capstoneproject.controller;


import com.kiu.capstoneproject.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/v1/files")
public class FileController {
    private final FileService fileService;

    @GetMapping("/{fileHash}/download")
    public ResponseEntity<UrlResource>  downloadFile(@PathVariable String fileHash) {
        return fileService.downloadFile(fileHash);
    }
}
