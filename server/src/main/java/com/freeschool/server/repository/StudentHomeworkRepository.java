package com.freeschool.server.repository;


import com.freeschool.server.model.entity.StudentHomework;
import com.freeschool.server.model.entity.StudentHomeworkId;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentHomeworkRepository extends JpaRepository<StudentHomework, StudentHomeworkId> {
    @Query("SELECT sh FROM StudentHomework sh WHERE sh.id.homeworkId = ?1")
    List<StudentHomework> findByHomeworkId(Long homeworkId);
}
