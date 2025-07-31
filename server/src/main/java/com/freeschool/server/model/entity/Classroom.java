package com.freeschool.server.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "classroom")
public class Classroom {

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long classroomId;

    @Column(unique=true)
    private String name;

    @ManyToOne(
            cascade = {CascadeType.PERSIST, CascadeType.MERGE}
    )
    private Teacher teacher;
}
