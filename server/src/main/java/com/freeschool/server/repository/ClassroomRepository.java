package com.freeschool.server.repository;

import com.freeschool.server.model.entity.Classroom;
import com.freeschool.server.model.entity.Teacher;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassroomRepository  extends JpaRepository<Classroom,Long> {
    @Query("SELECT c From Classroom c WHERE c.name = ?1")
    Optional<Classroom> findClassroomByName(String name);

    List<Classroom> findByTeacher(Teacher teacher);
}
