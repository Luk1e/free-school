package com.kiu.capstoneproject.service;

import com.kiu.capstoneproject.dto.classroom.ClassroomDTO;
import com.kiu.capstoneproject.dto.classroom.ClassroomNameDTO;
import com.kiu.capstoneproject.enums.EnrollmentStatus;
import com.kiu.capstoneproject.enums.Role;
import com.kiu.capstoneproject.exception.AlreadyExistsException;
import com.kiu.capstoneproject.exception.NotFoundException;
import com.kiu.capstoneproject.i18n.I18nUtil;
import com.kiu.capstoneproject.model.entity.*;
import com.kiu.capstoneproject.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClassroomService {
    private final UserRepository userRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final ClassroomRepository classroomRepository;
    private final StudentClassroomRepository studentClassroomRepository;
    private final NotificationService notificationService;
    private final I18nUtil i18nUtil;

    public List<ClassroomDTO> getClassrooms() {
        // get user from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername()).orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));

        List<Classroom> classrooms = null;

        if (user.getRole() == Role.TEACHER) {
            // validate teacher
            Teacher teacher = teacherRepository.findById(user.getUserId())
                    .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.teacherWithIdNotFound", user.getUserId().toString())));

            // find classrooms associated with this teacher
            classrooms = classroomRepository.findByTeacher(teacher);

            // throw error if there is no classroom associated with this teacher
            if (classrooms.isEmpty())
                throw new NotFoundException(i18nUtil.getMessage("error.youHavenTCreatedAnyClassroomsYet"));
        } else {
            // validate student
            Student student = studentRepository.findById(user.getUserId())
                    .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.studentWithIdNotFound", user.getUserId().toString())));

            // find classrooms in which this student is enrolled
            List<StudentClassroom> studentClassrooms = studentClassroomRepository.findByStudentId(student.getUserId());

            // find classrooms which have enrollment status approved
            classrooms = studentClassrooms.stream()
                    .filter(sc -> sc.getStatus() == EnrollmentStatus.APPROVED)
                    .map(StudentClassroom::getClassroom)
                    .collect(Collectors.toList());

            // throw error student has not joined any classrooms yet
            if (classrooms.isEmpty())
                throw new NotFoundException(i18nUtil.getMessage("error.youHavenTJoinedAnyClassroomYet"));
        }

        // return list of classroomDTOs
        return classrooms.stream()
                .map(classroom -> {
                    return new ClassroomDTO(classroom.getClassroomId(), classroom.getName());
                })
                .toList();

    }

    public Long createClassroom(ClassroomNameDTO classroomNameDTO) {
        // get user from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername()).orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));

        // validate if user is teacher
        Teacher teacher = teacherRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.teacherWithIdNotFound", user.getUserId().toString())));

        Optional<Classroom> classroomOptional = classroomRepository.
                findClassroomByName(classroomNameDTO.getName());

        if (classroomOptional.isEmpty()) {
            // create new classroom if the name is not taken
            Classroom classroom = new Classroom();
            classroom.setTeacher(teacher);
            classroom.setName(classroomNameDTO.getName());

            classroomRepository.save(classroom);
            return classroom.getClassroomId();
        } else {
            // throw error if the classroom name has already been taken
            throw new AlreadyExistsException(i18nUtil.getMessage("error.theNameHasAlreadyBeenTaken"));
        }
    }

    public void deleteClassroom(Long classroomId) {
        // get user from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername()).
                orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));

        Classroom classroom = classroomRepository.findById(classroomId).
                orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.classroomWithIdNotFound", classroomId.toString())));

        // if the classroom is associated with this teacher
        if (Objects.equals(classroom.getTeacher().getUserId(), user.getUserId())) {

            // delete classroom
            classroomRepository.deleteById(classroomId);
        } else {
            // throw error if the classroom is not associated with this teacher
            throw new NotFoundException(i18nUtil.getMessage("error.youAreNotAssociatedWithThisClassroom"));

        }
    }


}
