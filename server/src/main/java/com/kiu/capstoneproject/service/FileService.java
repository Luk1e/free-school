package com.kiu.capstoneproject.service;

import com.kiu.capstoneproject.enums.FileType;
import com.kiu.capstoneproject.exception.NotFoundException;
import com.kiu.capstoneproject.i18n.I18nUtil;
import com.kiu.capstoneproject.model.entity.File;
import com.kiu.capstoneproject.property.FileStorageProperty;
import com.kiu.capstoneproject.repository.FileRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FileService {
    @Autowired
    private FileRepository fileRepository;
    private final Path docStorageLocation;
    private final I18nUtil i18nUtil;

    @Autowired
    public FileService(FileStorageProperty fileStorageProperty, I18nUtil i18nUtil) throws IOException {
        this.docStorageLocation = Paths.get(fileStorageProperty.getUploadDirectory()).toAbsolutePath().normalize();
        Files.createDirectories(this.docStorageLocation);
        this.i18nUtil = i18nUtil;
    }


    @Transactional
    public File[] addFile(MultipartFile[] multipartFiles, FileType fileType) throws NoSuchAlgorithmException, IOException {
        List<File> files = new ArrayList<>();  // Use List for dynamic addition

        for (MultipartFile multipartFile : multipartFiles) {
            files.add(create(multipartFile, fileType));
        }

        return files.toArray(new File[0]);
    }

    private File create(MultipartFile multipartFile, FileType fileType) throws NoSuchAlgorithmException, IOException {
        File file = new File();
        file.setName(multipartFile.getOriginalFilename());
        file.setMimeType(multipartFile.getContentType());
        file.setSize(multipartFile.getSize());
        file.setType(fileType);
        file.setHash();
        storeFile(multipartFile, file.getHash());

        return fileRepository.save(file);
    }

    public String generateDownloadUrl(String hash) {
        return "files/" + hash + "/download";
    }

    public ResponseEntity<UrlResource> downloadFile(String fileHash) {
        File file = fileRepository.findByHash(fileHash);

        try {
            Path filePath = this.docStorageLocation.resolve(file.getHash());

            UrlResource resource = new UrlResource(filePath.toUri());

            // Set headers including content type and filename
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", file.getName()); // Adjust the filename here

            // Return the ResponseEntity with headers and resource
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);

        } catch (Exception e) {
            throw new NotFoundException(i18nUtil.getMessage("error.fileNotFound"));
        }
    }


    private void storeFile(MultipartFile file, String hash) throws IOException {
        Path targetLocation = this.docStorageLocation.resolve(hash);
        Files.copy(file.getInputStream(), targetLocation);
    }
}
