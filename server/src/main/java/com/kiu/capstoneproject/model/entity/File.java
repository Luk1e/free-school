package com.kiu.capstoneproject.model.entity;

import com.kiu.capstoneproject.enums.FileType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "file")
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;

    private String name;
    private String mimeType;

    @Builder.Default
    private long size = 0;

    @Column(name = "hash", nullable = false, unique = true)
    private String hash;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private FileType type;

    public static final int RADIX = 16;

    public void setHash() throws NoSuchAlgorithmException {
        String transformedName = new StringBuilder()
                .append(this.name)
                .append(this.mimeType)
                .append(this.size)
                .append(new Date().getTime())
                .toString();
        MessageDigest messageDigest = MessageDigest.getInstance("MD5");
        messageDigest.update(transformedName.getBytes(StandardCharsets.UTF_8));
        this.hash = new BigInteger(1, messageDigest.digest()).toString(RADIX);
    }
}