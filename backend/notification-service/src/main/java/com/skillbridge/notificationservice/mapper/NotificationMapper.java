package com.skillbridge.notificationservice.mapper;

import com.skillbridge.notificationservice.document.Notification;
import com.skillbridge.notificationservice.dto.response.NotificationResponse;

public class NotificationMapper {

    public static NotificationResponse toNotificationResponse(Notification notification) {
        return new NotificationResponse(
                notification.getId(),
                notification.getUserId(),
                notification.getTitle(),
                notification.getMessage(),
                notification.getType(),
                notification.isRead(),
                notification.getCreatedAt()
        );
    }
}