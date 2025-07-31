package com.freeschool.server.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "teacher")
public class Teacher extends User {
}