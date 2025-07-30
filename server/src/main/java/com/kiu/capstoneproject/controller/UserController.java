package com.kiu.capstoneproject.controller;

import com.kiu.capstoneproject.dto.notification.LatestNotificationDTO;
import com.kiu.capstoneproject.dto.notification.NotificationDTO;
import com.kiu.capstoneproject.dto.notification.NotificationGroupedByDateDTO;
import com.kiu.capstoneproject.dto.notification.ReadNotificationDTO;
import com.kiu.capstoneproject.service.NotificationService;
import com.kiu.capstoneproject.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/v1/user")
public class UserController {
    private final UserService userService;
    private final NotificationService notificationService;

    @GetMapping(path = "/notifications")
    @ResponseStatus(HttpStatus.OK)
    public List<NotificationGroupedByDateDTO> getNotifications() {
        return notificationService.getNotifications();
    }

    @GetMapping(path = "/notifications/latest")
    @ResponseStatus(HttpStatus.OK)
    public LatestNotificationDTO getLatestNotifications() {
        return notificationService.getLatestNotifications();
    }

    @PutMapping(path = "/notifications/read")
    @ResponseStatus(HttpStatus.OK)
    public void readNotifications() {
        notificationService.readNotifications();
    }
}
