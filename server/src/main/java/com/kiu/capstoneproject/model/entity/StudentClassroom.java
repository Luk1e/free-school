package com.kiu.capstoneproject.model.entity;

import com.kiu.capstoneproject.enums.EnrollmentStatus;
import lombok.*;
import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "student_classroom")
public class StudentClassroom implements Serializable {
    @EmbeddedId
    private StudentClassroomId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @MapsId("classroomId")
    @JoinColumn(name = "classroom_id")
    private Classroom classroom;

    @Enumerated(EnumType.STRING)
    private EnrollmentStatus status;

}
