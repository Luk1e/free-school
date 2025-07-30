package com.kiu.capstoneproject.repository;

import com.kiu.capstoneproject.model.entity.Notification;
import com.kiu.capstoneproject.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUser(User user);
    List<Notification> findFirst10ByUser(User user);

    @Query(value = "SELECT COUNT(*) FROM notification WHERE user_id = ?1 AND status = 'UNREAD'", nativeQuery = true)
    Integer countReadNotificationsByUserId(Long userId);

    @Query(value = "SELECT * FROM notification WHERE user_id = ?1 AND status = 'UNREAD' AND date_time < ?2", nativeQuery = true)
    List<Notification> findUnreadNotificationsByUserIdBeforeDate(Long userId, LocalDateTime dateTime);
}
