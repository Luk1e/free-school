package com.kiu.capstoneproject.service;

import com.kiu.capstoneproject.dto.classroom.ClassroomNameDTO;
import com.kiu.capstoneproject.dto.student.StudentDto;
import com.kiu.capstoneproject.enums.EnrollmentStatus;
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

@Service
@RequiredArgsConstructor
public class StudentService {
    private final UserRepository userRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final ClassroomRepository classroomRepository;
    private final StudentClassroomRepository studentClassroomRepository;
    private final NotificationService notificationService;
    private final I18nUtil i18nUtil;

    @Transactional
    public void enrollStudent(ClassroomNameDTO classroomNameDTO
    ) {
        // get user from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername()).orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));

        Student student = studentRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.studentWithIdNotFound", user.getUserId().toString())));

        Classroom classroom = classroomRepository.findClassroomByName(classroomNameDTO.getName())
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.classroomWithNameNotFound", classroomNameDTO.getName())));

        StudentClassroomId studentClassroomId = new StudentClassroomId(student.getUserId(), classroom.getClassroomId());
        Optional<StudentClassroom> studentClassroomOptional = studentClassroomRepository.findById(studentClassroomId);


        if (studentClassroomOptional.isPresent()) {
            if (studentClassroomOptional.get().getStatus() == EnrollmentStatus.APPROVED) {
                // throw error if student classroom object already exists with approved status
                throw new AlreadyExistsException(i18nUtil.getMessage("error.youAreAlreadyEnrolled"));
            } else {
                // throw error if student classroom object already exists with pending status
                throw new AlreadyExistsException(i18nUtil.getMessage("error.requestAlreadySubmitted"));
            }
        }

        // create new StudentClassroom object
        StudentClassroom studentClassroom = new StudentClassroom();
        studentClassroom.setId(studentClassroomId);
        studentClassroom.setStudent(student);
        studentClassroom.setClassroom(classroom);
        studentClassroom.setStatus(EnrollmentStatus.PENDING);

        studentClassroomRepository.save(studentClassroom);

        // add notification for teacher
        notificationService.addNotifications(classroom.getTeacher(),
                "<b>"
                        + student.getFirstName().substring(0, 1).toUpperCase() + student.getFirstName().substring(1).toLowerCase()
                        + " "
                        + student.getLastName().substring(0, 1).toUpperCase() + student.getLastName().substring(1).toLowerCase()
                        + "</b> wants to enroll in classroom <b>"
                        + classroom.getName() + "</b>"
                ,
                "<b>"
                        + student.getFirstName().substring(0, 1).toUpperCase() + student.getFirstName().substring(1).toLowerCase()
                        + " "
                        + student.getLastName().substring(0, 1).toUpperCase() + student.getLastName().substring(1).toLowerCase()
                        + "</b>-ს სურს გაწევრიანება კლასში <b>"
                        + classroom.getName() + "</b>"
                ,

                LocalDateTime.now());
    }

    @Transactional
    public void acceptStudent(
            Long classroomId,
            Long studentId
    ) {
        // get user(should be teacher) from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername()).
                orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound ")));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.studentWithIdNotFound", studentId.toString())));

        Classroom classroom = classroomRepository.findById(classroomId)
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.classroomWithIdNotFound ", classroomId.toString())));

        // if the classroom is associated with this teacher
        if (Objects.equals(classroom.getTeacher().getUserId(), user.getUserId())) {

            StudentClassroomId studentClassroomId = new StudentClassroomId(studentId, classroomId);
            StudentClassroom studentClassroom = studentClassroomRepository.findById(studentClassroomId)
                    .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.requestDoesNotExists")));

            if (studentClassroom.getStatus() == EnrollmentStatus.APPROVED) {
                // throw error if student is already enrolled in this classroom
                throw new AlreadyExistsException(i18nUtil.getMessage("error.requestAlreadyApproved"));
            }

            studentClassroom.setStatus(EnrollmentStatus.APPROVED);

            studentClassroomRepository.save(studentClassroom);
            // add notification for student
            notificationService.addNotifications(student,
                    "Your request to join the classroom <b>"
                            + classroom.getName()
                            + "</b> has been accepted"
                    ,
                    "თქვენი მოთხოვნა, კლასში <b>"
                            + classroom.getName()
                            + "</b> გაწევრიანებაზე დადასტურდა"
                    ,
                    LocalDateTime.now()
            );
        } else {
            // throw error if the classroom is not associated with this teacher
            throw new NotFoundException(i18nUtil.getMessage("error.youAreNotAssociatedWithThisClassroom"));
        }
    }

    @Transactional
    public void rejectStudent(
            Long classroomId,
            Long studentId
    ) {
        // get user(should be teacher) from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername()).
                orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.studentWithIdNotFound", studentId.toString())));

        Classroom classroom = classroomRepository.findById(classroomId)
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.classroomWithIdNotFound", classroomId.toString())));

        // if the classroom is associated with this teacher
        if (Objects.equals(classroom.getTeacher().getUserId(), user.getUserId())) {

            StudentClassroomId studentClassroomId = new StudentClassroomId(studentId, classroomId);
            StudentClassroom studentClassroom = studentClassroomRepository.findById(studentClassroomId)
                    .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.requestDoesNotExists")));

            if (studentClassroom.getStatus() == EnrollmentStatus.APPROVED) {
                // throw error if student is already enrolled in this classroom
                throw new AlreadyExistsException(i18nUtil.getMessage("error.requestAlreadyApproved"));
            }

            studentClassroomRepository.deleteById(studentClassroomId);
            // add notification for student
            notificationService.addNotifications(student,
                    "Your request to join the classroom <b>"
                            + classroom.getName()
                            + "</b> has been rejected"
                    ,
                    "თქვენი მოთხოვნა, კლასში <b>"
                            + classroom.getName()
                            + "</b> გაწევრიანებაზე უარყოფილია"
                    ,
                    LocalDateTime.now()
            );
        } else {
            // throw error if the classroom is not associated with this teacher
            throw new NotFoundException(i18nUtil.getMessage("error.youAreNotAssociatedWithThisClassroom"));
        }
    }

    @Transactional
    public void removeStudent(
            Long classroomId,
            Long studentId
    ) {
        // get user(should be teacher) from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername()).
                orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.studentWithIdNotFound", studentId.toString())));

        Classroom classroom = classroomRepository.findById(classroomId)
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.classroomWithIdNotFound", classroomId.toString())));

        // if the classroom is associated with this teacher
        if (Objects.equals(classroom.getTeacher().getUserId(), user.getUserId())) {
            StudentClassroomId studentClassroomId = new StudentClassroomId(studentId, classroomId);
            StudentClassroom studentClassroom = studentClassroomRepository.findById(studentClassroomId)
                    .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.requestDoesNotExists")));

            studentClassroomRepository.deleteById(studentClassroomId);
            // add notification for student
            notificationService.addNotifications(student,
                    "You have been removed from classroom <b>"
                            + classroom.getName()
                            + "</b> by <b>"
                            + user.getFirstName().substring(0, 1).toUpperCase() + user.getUsername().substring(1).toLowerCase()
                            + " "
                            + user.getLastName().substring(0, 1).toUpperCase() + user.getLastName().substring(1).toLowerCase()
                            + "</b>"
                    ,
                    "თქვენ წაგშალეს კლასიდან <b>"
                            + classroom.getName()
                            + "</b>"
                    ,
                    LocalDateTime.now()
            );
        } else {
            // throw error if the classroom is not associated with this teacher
            throw new NotFoundException(i18nUtil.getMessage("error.youAreNotAssociatedWithThisClassroom"));
        }
    }


    public List<StudentDto> getStudents(Long classroomId) {
        // get user(should be teacher) from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername()).
                orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));

        Classroom classroom = classroomRepository.findById(classroomId).
                orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.classroomWithIdNotFound", classroomId.toString())));

        // if the classroom is associated with this teacher
        if (Objects.equals(classroom.getTeacher().getUserId(), user.getUserId())) {
            List<StudentClassroom> studentClassrooms = studentClassroomRepository.findByClassroomId(classroomId);
            if (studentClassrooms.isEmpty())
                throw new NotFoundException(i18nUtil.getMessage("error.theClassroomIsEmpty"));

            return studentClassrooms.stream()
                    .map(studentClassroom -> {
                        Student student = studentClassroom.getStudent();
                        return new StudentDto(student.getUserId(), student.getFirstName(), student.getLastName(), student.getEmail(), studentClassroom.getStatus());
                    })
                    .toList();
        } else {
            // throw error if the classroom is not associated with this teacher
            throw new NotFoundException(i18nUtil.getMessage("error.youAreNotAssociatedWithThisClassroom"));
        }

    }
}
