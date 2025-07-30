package com.kiu.capstoneproject.service;

import com.kiu.capstoneproject.dto.notification.LatestNotificationDTO;
import com.kiu.capstoneproject.dto.notification.NotificationDTO;
import com.kiu.capstoneproject.dto.notification.NotificationGroupedByDateDTO;
import com.kiu.capstoneproject.dto.notification.ReadNotificationDTO;
import com.kiu.capstoneproject.enums.NotificationStatus;
import com.kiu.capstoneproject.exception.NotFoundException;
import com.kiu.capstoneproject.i18n.I18nUtil;
import com.kiu.capstoneproject.i18n.LocalHolder;
import com.kiu.capstoneproject.model.entity.*;
import com.kiu.capstoneproject.repository.NotificationRepository;
import com.kiu.capstoneproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final I18nUtil i18nUtil;
    private final LocalHolder localHolder;

    public List<NotificationGroupedByDateDTO> getNotifications() {
        // get user from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername())
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));

        // get notifications and group by date
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy");
        List<NotificationDTO> notifications = notificationRepository.findByUser(user)
                .stream()
                .map(notification -> NotificationDTO.builder()
                        .notificationId(notification.getNotificationId())
                        .text(Objects.equals(localHolder.getCurrentLocale().getLanguage(), "geo") ? notification.getText_geo() : notification.getText())
                        .dateTime(notification.getDateTime())
                        .status(notification.getStatus())
                        .build())
                .sorted(Comparator.comparing(NotificationDTO::getDateTime).reversed()) // Sort notifications by dateTime in descending order
                .toList();

        // group notifications by date
        Map<String, List<NotificationDTO>> groupedNotifications = notifications.stream()
                .collect(Collectors.groupingBy(notificationDTO -> notificationDTO.getDateTime().format(formatter)));

        // Convert the map to a sorted list of entries
        List<Map.Entry<String, List<NotificationDTO>>> sortedEntries = new ArrayList<>(groupedNotifications.entrySet());
        sortedEntries.sort((e1, e2) -> {
            LocalDate date1 = LocalDate.parse(e1.getKey(), formatter);
            LocalDate date2 = LocalDate.parse(e2.getKey(), formatter);
            return date2.compareTo(date1);
        });

        // Convert the sorted entries to the desired DTO format
        List<NotificationGroupedByDateDTO> result = sortedEntries.stream()
                .map(entry -> NotificationGroupedByDateDTO.builder()
                        .date(entry.getKey())
                        .notifications(entry.getValue())
                        .build())
                .collect(Collectors.toList());

        return result;
    }


    public LatestNotificationDTO getLatestNotifications() {
        // get user from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername())
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));

        // get latest 10 notifications
        List<NotificationDTO> latestNotifications = notificationRepository.findFirst10ByUser(user)
                .stream()
                .map(notification -> NotificationDTO
                        .builder()
                        .notificationId(notification.getNotificationId())
                        .text(notification.getText())
                        .dateTime(notification.getDateTime())
                        .status(notification.getStatus())
                        .build()
                )
                .toList();

        Integer numberOfUnreadNotification = notificationRepository.countReadNotificationsByUserId(user.getUserId());

        return LatestNotificationDTO.builder()
                .latestNotifications(latestNotifications)
                .numberOfUnreadNotification(numberOfUnreadNotification)
                .build();
    }


    public void readNotifications() {
        // get user from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername())
                .orElseThrow(() -> new NotFoundException(i18nUtil.getMessage("error.userNotFound")));

        List<Notification> unreadNotifications = notificationRepository.findUnreadNotificationsByUserIdBeforeDate(user.getUserId(), LocalDateTime.now());
        System.out.println(unreadNotifications);
        unreadNotifications.forEach(notification -> notification.setStatus(NotificationStatus.READ));

        notificationRepository.saveAll(unreadNotifications);
    }

    public void addNotifications(User user, String text, String text_geo, LocalDateTime dateTime) {
        notificationRepository.save(Notification
                .builder()
                .user(user)
                .text(text)
                .text_geo(text_geo)
                .dateTime(dateTime)
                .status(NotificationStatus.UNREAD)
                .build());
    }
}
