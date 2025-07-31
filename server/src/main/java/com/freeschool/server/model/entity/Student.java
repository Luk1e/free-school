package com.freeschool.server.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "student")
public class Student extends User {

}