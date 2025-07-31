package com.freeschool.server.controller;

import com.freeschool.server.dto.notification.LatestNotificationDTO;
import com.freeschool.server.dto.notification.NotificationGroupedByDateDTO;
import com.freeschool.server.service.NotificationService;
import com.freeschool.server.service.UserService;
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
