package com.kiu.capstoneproject.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Entity
@Table(name = "student")
public class Student extends User {

}