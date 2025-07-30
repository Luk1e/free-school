package com.kiu.capstoneproject.repository;

import com.kiu.capstoneproject.model.entity.Teacher;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}
