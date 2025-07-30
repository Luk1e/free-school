package com.kiu.capstoneproject.service;

import com.kiu.capstoneproject.dto.file.FileDTO;
import com.kiu.capstoneproject.dto.file.SolutionFileDTO;
import com.kiu.capstoneproject.dto.homework.*;
import com.kiu.capstoneproject.enums.EnrollmentStatus;
import com.kiu.capstoneproject.enums.FileType;
import com.kiu.capstoneproject.enums.HomeworkStatus;
import com.kiu.capstoneproject.enums.Role;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HomeworkService {
    private final HomeworkRepository homeworkRepository;
    private final UserRepository userRepository;
    private final FileService fileService;
    private final ClassroomRepository classroomRepository;
    private final StudentClassroomRepository studentClassroomRepository;
    private final StudentHomeworkRepository studentHomeworkRepository;
    private final NotificationService notificationService;
    private final I18nUtil i18nUtil;

    @Transactional
    public Long createHomework(Long classroomId, HomeworkRequestDTO homeworkRequestDTO) throws NoSuchAlgorithmException, IOException {
        // get user from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername())
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));

        Classroom classroom = classroomRepository.findById(classroomId)
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.classroomWithIdNotFound", classroomId.toString())));

        File file = null;
        if (homeworkRequestDTO.getFile() != null) {
            // save and return file
            MultipartFile[] files = new MultipartFile[]{homeworkRequestDTO.getFile()};
            // the method works for files array, so we need only homework file
            file = fileService.addFile(files, FileType.HOMEWORK)[0];
        }

        // if the classroom is associated with this teacher
        if (Objects.equals(classroom.getTeacher().getUserId(), user.getUserId())) {
            // create new homework
            Homework homework = Homework
                    .builder()
                    .title(homeworkRequestDTO.getTitle())
                    .instruction(homeworkRequestDTO.getInstruction())
                    .totalGrade(homeworkRequestDTO.getTotalGrade())
                    .submittedNumber(0)
                    .classroom(classroom)
                    .homeworkFile(file)
                    .build();
            homeworkRepository.save(homework);

            List<StudentClassroom> studentClassrooms = studentClassroomRepository.findByClassroomId(classroomId);

            // create studentHomeworks for each student of the classroom (if enrollment status is approved)
            for (StudentClassroom studentClassroom : studentClassrooms) {
                // check enrollment status
                if (studentClassroom.getStatus() == EnrollmentStatus.APPROVED) {
                    StudentHomeworkId studentHomeworkId = new StudentHomeworkId(user.getUserId(), classroomId);

                    StudentHomework studentHomework = StudentHomework
                            .builder()
                            .id(studentHomeworkId)
                            .grade(0)
                            .student(studentClassroom.getStudent())
                            .homework(homework)
                            .status(HomeworkStatus.ASSIGNED)
                            .solutionFile(null)
                            .build();

                    studentHomeworkRepository.save(studentHomework);
                    notificationService.addNotifications(studentClassroom.getStudent(),
                            "<b>"
                                    + user.getFirstName().substring(0, 1).toUpperCase() + user.getFirstName().substring(1).toLowerCase()
                                    + " "
                                    + user.getLastName().substring(0, 1).toUpperCase() + user.getLastName().substring(1).toLowerCase()
                                    + "</b> added an assignment in <b>"
                                    + classroom.getName()
                                    + "</b>",
                            "<b>"
                                    + user.getFirstName().substring(0, 1).toUpperCase() + user.getFirstName().substring(1).toLowerCase()
                                    + user.getLastName().substring(0, 1).toUpperCase() + user.getLastName().substring(1).toLowerCase()
                                    + "</b> - მა დაამატა დავალება კლასში <b>"
                                    + classroom.getName()
                                    + "</b>",
                            LocalDateTime.now()
                    );

                }
            }

            return homework.getHomeworkId();
        } else {
            // throw error if the classroom is not associated with this teacher
            throw new NotFoundException(i18nUtil.getMessage("error.youAreNotAssociatedWithThisClassroom"));
        }
    }

    public List<HomeworkDescriptionDTO> getHomeworks(Long classroomId) {
        // get user from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername())
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));

        Classroom classroom = classroomRepository.findById(classroomId)
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.classroomWithIdNotFound", classroomId.toString())));

        // if the student is enrolled in this classroom
        if (studentClassroomRepository.findById(new StudentClassroomId(user.getUserId(), classroomId)).isPresent()) {

            return homeworkRepository.findAllByClassroom_ClassroomId(classroomId)
                    .stream()
                    .filter(homework -> studentHomeworkRepository
                            .findById(new StudentHomeworkId(user.getUserId(), homework.getHomeworkId()))
                            .isPresent())
                    .map(homework ->
                            HomeworkDescriptionDTO.builder()
                                    .homeworkId(homework.getHomeworkId())
                                    .title(homework.getTitle())
                                    .grade(studentHomeworkRepository
                                            .findById(new StudentHomeworkId(user.getUserId(), homework.getHomeworkId()))
                                            .get()
                                            .getGrade())
                                    .totalGrade(homework.getTotalGrade())
                                    .status(studentHomeworkRepository
                                            .findById(new StudentHomeworkId(user.getUserId(), homework.getHomeworkId()))
                                            .get()
                                            .getStatus())
                                    .build())
                    .collect(Collectors.toList());

        } else if (Objects.equals(classroom.getTeacher().getUserId(), user.getUserId())) {
            // if the classroom is associated with this teacher
            return homeworkRepository.findAllByClassroom_ClassroomId(classroomId)
                    .stream()
                    .map(homework -> HomeworkDescriptionDTO
                            .builder()
                            .homeworkId(homework.getHomeworkId())
                            .title(homework.getTitle())
                            .submittedNumber(homework.getSubmittedNumber())
                            .studentNumber(studentHomeworkRepository.findByHomeworkId(homework.getHomeworkId()).size())
                            .build())
                    .collect(Collectors.toList());
        } else {
            // throw error if the user is not associated with this classroom
            throw new NotFoundException(i18nUtil.getMessage("error.youAreNotAssociatedWithThisClassroom"));
        }

    }

    public HomeworkResponseDTO getHomework(Long classroomId, Long homeworkId) {
        // get user from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername())
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));

        Classroom classroom = classroomRepository.findById(classroomId)
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.classroomWithIdNotFound", classroomId.toString())));

        // if the classroom is associated with this teacher
        if (Objects.equals(classroom.getTeacher().getUserId(), user.getUserId())) {

            Homework homework = homeworkRepository.getReferenceById(homeworkId);
            File homeworkFile = homework.getHomeworkFile();

            HomeworkResponseDTO homeworkResponseDTO = new HomeworkResponseDTO();
            homeworkResponseDTO.setTitle(homework.getTitle());
            homeworkResponseDTO.setInstruction(homework.getInstruction());
            homeworkResponseDTO.setTotalGrade(homework.getTotalGrade());
            if (homeworkFile != null) {
                homeworkResponseDTO.setHomeworkFile(
                        new FileDTO(
                                homeworkFile.getName(),
                                homeworkFile.getSize(),
                                fileService.generateDownloadUrl(homeworkFile.getHash())
                        )
                );
            }

            return homeworkResponseDTO;
        } else {
            // throw error if the classroom is not associated with this teacher
            throw new NotFoundException(i18nUtil.getMessage("error.youAreNotAssociatedWithThisClassroom"));
        }
    }

    @Transactional
    public void updateHomework(
            Long classroomId,
            Long homeworkId,
            HomeworkRequestDTO homeworkRequestDTO) throws NoSuchAlgorithmException, IOException {
        // get user from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername())
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));

        Classroom classroom = classroomRepository.findById(classroomId)
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.classroomWithIdNotFound", classroomId.toString())));

        // if the classroom is associated with this teacher
        if (Objects.equals(classroom.getTeacher().getUserId(), user.getUserId())) {

            Homework homework = homeworkRepository.getReferenceById(homeworkId);
            homework.setTitle(homeworkRequestDTO.getTitle());
            homework.setInstruction(homeworkRequestDTO.getInstruction());
            homework.setTotalGrade(homeworkRequestDTO.getTotalGrade());

            if (homeworkRequestDTO.getFile() != null) {
                // save and return file
                MultipartFile[] files = new MultipartFile[]{homeworkRequestDTO.getFile()};
                // the method works for files array, so we need only homework file
                File file = fileService.addFile(files, FileType.HOMEWORK)[0];

                homework.setHomeworkFile(file);
            }

            homeworkRepository.save(homework);

            // add notification for each student
            studentHomeworkRepository.findByHomeworkId(homeworkId).forEach(studentHomework ->
                    notificationService.addNotifications(studentHomework.getStudent(),
                            "<b>"
                                    + user.getFirstName().substring(0, 1).toUpperCase() + user.getFirstName().substring(1).toLowerCase()
                                    + " "
                                    + user.getLastName().substring(0, 1).toUpperCase() + user.getLastName().substring(1).toLowerCase()
                                    + "</b> updated an assignment <b>"
                                    + homeworkRequestDTO.getTitle()
                                    + "</b> in classroom <b>"
                                    + classroom.getName()
                                    + "</b>"
                            ,
                            "<b>"
                                    + user.getFirstName().substring(0, 1).toUpperCase() + user.getFirstName().substring(1).toLowerCase()
                                    + " "
                                    + user.getLastName().substring(0, 1).toUpperCase() + user.getLastName().substring(1).toLowerCase()
                                    + "</b> - მა შეასწორა დავალება <b>"
                                    + homeworkRequestDTO.getTitle()
                                    + "</b> კლასში <b>"
                                    + classroom.getName()
                                    + "</b>"
                            ,
                            LocalDateTime.now()
                    ));

        } else {
            // throw error if the classroom is not associated with this teacher
            throw new NotFoundException(i18nUtil.getMessage("error.youAreNotAssociatedWithThisClassroom"));
        }
    }


    public StudentHomeworkListDTO getStudentHomeworks(Long classroomId, Long homeworkId) {
        // get user from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername())
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));

        Classroom classroom = classroomRepository.findById(classroomId)
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.classroomWithIdNotFound", classroomId.toString())));

        // if the classroom is associated with this teacher
        if (Objects.equals(classroom.getTeacher().getUserId(), user.getUserId())) {

            Homework homework = homeworkRepository.getReferenceById(homeworkId);

            List<StudentHomeworkDTO> studentHomeworkDTOS = studentHomeworkRepository.findByHomeworkId(homeworkId).stream()
                    .map(studentHomework -> StudentHomeworkDTO
                            .builder()
                            .studentId(studentHomework.getStudent().getUserId())
                            .firstName(studentHomework.getStudent().getFirstName())
                            .lastName(studentHomework.getStudent().getLastName())
                            .grade(studentHomework.getGrade())
                            .status(studentHomework.getStatus())
                            .build()
                    )
                    .toList();


            return StudentHomeworkListDTO
                    .builder()
                    .title(homework.getTitle())
                    .totalGrade(homework.getTotalGrade())
                    .studentHomeworkDTOS(studentHomeworkDTOS)
                    .build();
        } else {
            // throw error if the classroom is not associated with this teacher
            throw new NotFoundException(i18nUtil.getMessage("error.youAreNotAssociatedWithThisClassroom"));
        }
    }

    @Transactional
    public void deleteHomework(Long classroomId, Long homeworkId) {
        // get user from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername())
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));

        Classroom classroom = classroomRepository.findById(classroomId)
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.classroomWithIdNotFound", classroomId.toString())));

        // if the classroom is associated with this teacher
        if (Objects.equals(classroom.getTeacher().getUserId(), user.getUserId())) {
            homeworkRepository.deleteById(homeworkId);


        } else {
            // throw error if the classroom is not associated with this teacher
            throw new NotFoundException(i18nUtil.getMessage("error.youAreNotAssociatedWithThisClassroom"));
        }
    }

    public HomeworkDTO getStudentHomework(
            Long homeworkId,
            Long studentId
    ) {
        // get user from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername())
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")
                ));

        // if the user is student than frontend haven't sent and studentId
        if (user.getRole() == Role.STUDENT) {
            studentId = user.getUserId();
        }

        Homework homework = homeworkRepository.findById(homeworkId)
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.homeworkWithIdNotFound", homeworkId.toString())));

        StudentHomework studentHomework = studentHomeworkRepository.findById(new StudentHomeworkId(studentId, homeworkId))
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.studentIsNotAssociatedWithThisHomework")));

        // if the user is student associated with this homework or teacher of this classroom
        if (Objects.equals(user.getUserId(), studentId) || Objects.equals(studentHomework.getHomework().getClassroom().getTeacher().getUserId(), user.getUserId())) {
            File homeworkFile = homework.getHomeworkFile();
            File solutionFile = studentHomework.getSolutionFile();

            HomeworkDTO homeworkDTO =
                    HomeworkDTO.builder()
                            .homeworkId(homeworkId)
                            .title(homework.getTitle())
                            .instruction(homework.getInstruction())
                            .grade(studentHomework.getGrade())
                            .totalGrade(homework.getTotalGrade())
                            .homeworkFile(null)
                            .solutionFile(null)
                            .status(studentHomework.getStatus())
                            .build();

            if (homeworkFile != null) {
                homeworkDTO.setHomeworkFile(
                        new FileDTO(
                                homeworkFile.getName(),
                                homeworkFile.getSize(),
                                fileService.generateDownloadUrl(homeworkFile.getHash())
                        )
                );
            }

            if (solutionFile != null) {
                homeworkDTO.setSolutionFile(
                        new FileDTO(
                                solutionFile.getName(),
                                solutionFile.getSize(),
                                fileService.generateDownloadUrl(solutionFile.getHash())
                        )
                );
            }

            return homeworkDTO;
        } else {
            // throw error if the user is not associated with this classroom
            throw new NotFoundException(i18nUtil.getMessage("error.youDoNotHaveAccessToThisHomework"));
        }
    }


    public void submitSolution(
            Long homeworkId,
            SolutionFileDTO solutionFileDTO
    ) throws NoSuchAlgorithmException, IOException {
        // get user from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername())
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));


        StudentHomework studentHomework = studentHomeworkRepository.findById(new StudentHomeworkId(user.getUserId(), homeworkId))
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.studentIsNotAssociatedWithThisHomework")));


        File file = null;
        if (solutionFileDTO.getFile() != null) {
            // save and return file
            MultipartFile[] files = new MultipartFile[]{solutionFileDTO.getFile()};
            // the method works for files array, so we need only homework file
            file = fileService.addFile(files, FileType.HOMEWORK)[0];
        }

        if (studentHomework.getStatus() == HomeworkStatus.ASSIGNED) {
            // increase submitted number for homework if student have not submitted solution
            Homework homework = studentHomework.getHomework();
            homework.setSubmittedNumber(homework.getSubmittedNumber() + 1);
        }

        studentHomework.setSolutionFile(file);
        studentHomework.setStatus(HomeworkStatus.SUBMITTED);
        studentHomeworkRepository.save(studentHomework);
    }

    public void removeSolution(Long homeworkId) {
        // get user from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername())
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));

        if (user.getRole() == Role.STUDENT) {
            StudentHomework studentHomework = studentHomeworkRepository.findById(new StudentHomeworkId(user.getUserId(), homeworkId))
                    .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.studentIsNotAssociatedWithThisHomework")));

            studentHomework.setSolutionFile(null);
            studentHomeworkRepository.save(studentHomework);
        } else {
            Homework homework = homeworkRepository.findById(homeworkId)
                    .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.homeworkNotFound")));

            if (Objects.equals(homework.getClassroom().getTeacher().getUserId(), user.getUserId())) {
                homework.setHomeworkFile(null);
                homeworkRepository.save(homework);
            }
        }

    }

    @Transactional
    public void gradeHomework(
            Long homeworkId,
            Long studentId,
            Integer grade
    ) {
        // get user from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername())
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));


        StudentHomework studentHomework = studentHomeworkRepository.findById(new StudentHomeworkId(studentId, homeworkId))
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.studentIsNotAssociatedWithThisHomework")));

        // if the teacher is associated with this homework
        if (Objects.equals(studentHomework.getHomework().getClassroom().getTeacher().getUserId(), user.getUserId())) {
            if (studentHomework.getStatus() == HomeworkStatus.ASSIGNED) {
                // increase submitted number for homework if student have not submitted solution
                // but teacher has already graded
                Homework homework = studentHomework.getHomework();
                homework.setSubmittedNumber(homework.getSubmittedNumber() + 1);
            }


            studentHomework.setGrade(grade);
            studentHomework.setStatus(HomeworkStatus.GRADED);
            studentHomeworkRepository.save(studentHomework);

            notificationService.addNotifications(studentHomework.getStudent(),
                    "<b>"
                            + user.getFirstName().substring(0, 1).toUpperCase() + user.getFirstName().substring(1).toLowerCase()
                            + " "
                            + user.getLastName().substring(0, 1).toUpperCase() + user.getLastName().substring(1).toLowerCase()
                            + "</b> returned an assignment <b>"
                            + studentHomework.getHomework().getTitle()
                            + "</b> in classroom <b>"
                            + studentHomework.getHomework().getClassroom().getName()
                            + "</b>"
                    ,
                    "<b>"
                            + user.getFirstName().substring(0, 1).toUpperCase() + user.getFirstName().substring(1).toLowerCase()
                            + " "
                            + user.getLastName().substring(0, 1).toUpperCase() + user.getLastName().substring(1).toLowerCase()
                            + "</b> დაგიბრუნათ დავალება <b>"
                            + studentHomework.getHomework().getTitle()
                            + "</b> კლასში <b>"
                            + studentHomework.getHomework().getClassroom().getName()
                            + "</b>"
                    ,
                    LocalDateTime.now()
            );

        } else {
            // throw error if the student is not associated with this classroom
            throw new NotFoundException(i18nUtil.getMessage("error.youDoNotHaveAccessToThisHomework"));
        }
    }

}
