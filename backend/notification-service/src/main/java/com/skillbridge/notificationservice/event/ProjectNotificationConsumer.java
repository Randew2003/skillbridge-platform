package com.skillbridge.notificationservice.event;

import com.skillbridge.notificationservice.config.RabbitMQConfig;
import com.skillbridge.notificationservice.document.Notification;
import com.skillbridge.notificationservice.repository.NotificationRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ProjectNotificationConsumer {

    private final NotificationRepository notificationRepository;

    public ProjectNotificationConsumer(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @RabbitListener(queues = RabbitMQConfig.PROJECT_NOTIFICATION_QUEUE)
    public void consumeProjectNotification(NotificationEvent event) {
        Notification notification = new Notification();

        notification.setUserId(event.getUserId());
        notification.setTitle(event.getTitle());
        notification.setMessage(event.getMessage());
        notification.setType(event.getType());
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);

        System.out.println("Project notification saved for user id: " + event.getUserId());
    }
}