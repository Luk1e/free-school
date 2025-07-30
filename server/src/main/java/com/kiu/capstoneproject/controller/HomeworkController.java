package com.kiu.capstoneproject.controller;


import com.kiu.capstoneproject.dto.file.SolutionFileDTO;
import com.kiu.capstoneproject.dto.homework.*;
import com.kiu.capstoneproject.service.HomeworkService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/v1/classroom/{classroomId}/homeworks")
public class HomeworkController {
    private final HomeworkService homeworkService;


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Long> createHomework(
            @PathVariable("classroomId") Long classroomId,
            @Valid @ModelAttribute HomeworkRequestDTO homeworkRequestDTO) throws NoSuchAlgorithmException, IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(homeworkService.createHomework(classroomId, homeworkRequestDTO));
    }


    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<HomeworkDescriptionDTO> getHomeworks(@PathVariable("classroomId") Long classroomId) {
        return homeworkService.getHomeworks(classroomId);
    }


    @GetMapping(path = "/{homeworkId}")
    @ResponseStatus(HttpStatus.OK)
    public StudentHomeworkListDTO getStudentHomeworks(
            @PathVariable("classroomId") Long classroomId,
            @PathVariable("homeworkId") Long homeworkId) {
        return homeworkService.getStudentHomeworks(classroomId, homeworkId);
    }


    @GetMapping(path = "/{homeworkId}/details")
    @ResponseStatus(HttpStatus.OK)
    public HomeworkResponseDTO getHomework(
            @PathVariable("classroomId") Long classroomId,
            @PathVariable("homeworkId") Long homeworkId
    ) {
        return homeworkService.getHomework(classroomId, homeworkId);
    }

    @PatchMapping(path = "/{homeworkId}/update")
    @ResponseStatus(HttpStatus.OK)
    public void updateHomework(
            @PathVariable("classroomId") Long classroomId,
            @PathVariable("homeworkId") Long homeworkId,
            @Valid @ModelAttribute HomeworkRequestDTO homeworkRequestDTO
    ) throws NoSuchAlgorithmException, IOException {
        homeworkService.updateHomework(classroomId, homeworkId, homeworkRequestDTO);
    }


    @GetMapping(path = "/{homeworkId}/{studentId}")
    @ResponseStatus(HttpStatus.OK)
    public HomeworkDTO getStudentHomework(
            @PathVariable("homeworkId") Long homeworkId,
            @PathVariable("studentId") Long studentId
    ) {

        return homeworkService.getStudentHomework(homeworkId, studentId);
    }

    @PatchMapping(path = "/{homeworkId}/{studentId}/grade")
    @ResponseStatus(HttpStatus.OK)
    public void gradeHomework(
            @PathVariable("homeworkId") Long homeworkId,
            @PathVariable("studentId") Long studentId,
            @RequestBody Integer grade
    ) {
        homeworkService.gradeHomework(homeworkId, studentId, grade);
    }

    @PatchMapping(path = "/{homeworkId}/submit")
    @ResponseStatus(HttpStatus.OK)
    public void submitSolution(
            @PathVariable("homeworkId") Long homeworkId,
            @Valid @ModelAttribute SolutionFileDTO solutionFileDTO) throws NoSuchAlgorithmException, IOException {
        homeworkService.submitSolution(homeworkId, solutionFileDTO);
    }

    @PatchMapping(path = "/{homeworkId}/remove")
    @ResponseStatus(HttpStatus.OK)
    public void removeSolution(
            @PathVariable("homeworkId") Long homeworkId) {
        homeworkService.removeSolution(homeworkId);
    }

    @DeleteMapping(path = "/{homeworkId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteHomework(
            @PathVariable("classroomId") Long classroomId,
            @PathVariable("homeworkId") Long homeworkId) {
        homeworkService.deleteHomework(classroomId, homeworkId);
    }
}
