package com.skillbridge.notificationservice.service;

import com.skillbridge.notificationservice.dto.request.NotificationRequest;
import com.skillbridge.notificationservice.dto.response.NotificationResponse;

import java.util.List;

public interface NotificationService {

    NotificationResponse createNotification(NotificationRequest request);

    NotificationResponse getNotificationById(String id);

    List<NotificationResponse> getNotificationsByUserId(Long userId);

    List<NotificationResponse> getUnreadNotificationsByUserId(Long userId);

    NotificationResponse markAsRead(String id);

    void deleteNotification(String id);
}