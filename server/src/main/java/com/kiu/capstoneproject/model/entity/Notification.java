package com.kiu.capstoneproject.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kiu.capstoneproject.enums.NotificationStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "notification", indexes = {
        @Index(name = "idx_date_time", columnList = "dateTime")
})
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    private String text;
    private String text_geo;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "userId"
    )
    private User user;


    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateTime;


    @Enumerated(EnumType.STRING)
    private NotificationStatus status;
}
