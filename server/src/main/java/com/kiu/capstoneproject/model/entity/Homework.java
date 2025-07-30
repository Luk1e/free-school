package com.kiu.capstoneproject.model.entity;

import lombok.*;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.beans.factory.annotation.Value;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "homework")
public class Homework {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long homeworkId;
    private String title;
    private String instruction;
    private Integer totalGrade;
    private Integer submittedNumber;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(
            name = "classroom_id",
            referencedColumnName = "classroomId"
    )
    private Classroom classroom;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "file_id")
    private File homeworkFile;
}