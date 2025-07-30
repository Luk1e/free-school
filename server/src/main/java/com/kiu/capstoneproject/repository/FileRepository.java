package com.kiu.capstoneproject.repository;

import com.kiu.capstoneproject.model.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {
    File findByHash(String hash);
}
