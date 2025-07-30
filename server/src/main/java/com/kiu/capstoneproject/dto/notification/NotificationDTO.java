package com.kiu.capstoneproject.dto.notification;

import com.kiu.capstoneproject.enums.NotificationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationDTO {
    private Long notificationId;
    private String text;
    private LocalDateTime dateTime;
    private NotificationStatus status;

}
