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
public class NotificationGroupedByDateDTO {
    private String date;
    private List<NotificationDTO> notifications;
}