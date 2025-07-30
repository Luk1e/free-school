package com.kiu.capstoneproject.dto.notification;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LatestNotificationDTO {
    Integer numberOfUnreadNotification;
    List<NotificationDTO> latestNotifications;
}
