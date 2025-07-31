package com.freeschool.server.repository;

import com.freeschool.server.model.entity.Homework;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomeworkRepository extends JpaRepository<Homework, Long> {
    List<Homework> findAllByClassroom_ClassroomId(Long classroomId);
}
