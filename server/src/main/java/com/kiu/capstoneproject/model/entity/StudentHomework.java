package com.kiu.capstoneproject.model.entity;

import com.kiu.capstoneproject.enums.HomeworkStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class StudentHomework implements Serializable {
    @EmbeddedId
    private StudentHomeworkId id;

    private Integer grade;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @MapsId("homeworkId")
    @JoinColumn(name = "homework_id")
    private Homework homework;

    @Enumerated(EnumType.STRING)
    private HomeworkStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "file_id")
    private File solutionFile;
}
