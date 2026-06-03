package com.skillbridge.notificationservice.service.impl;

import com.skillbridge.notificationservice.document.Notification;
import com.skillbridge.notificationservice.dto.request.NotificationRequest;
import com.skillbridge.notificationservice.dto.response.NotificationResponse;
import com.skillbridge.notificationservice.exception.ResourceNotFoundException;
import com.skillbridge.notificationservice.mapper.NotificationMapper;
import com.skillbridge.notificationservice.repository.NotificationRepository;
import com.skillbridge.notificationservice.service.NotificationService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public NotificationResponse createNotification(NotificationRequest request) {
        Notification notification = new Notification();

        notification.setUserId(request.getUserId());
        notification.setTitle(request.getTitle());
        notification.setMessage(request.getMessage());
        notification.setType(request.getType().toUpperCase());
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());

        Notification savedNotification = notificationRepository.save(notification);

        return NotificationMapper.toNotificationResponse(savedNotification);
    }

    @Override
    public NotificationResponse getNotificationById(String id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + id));

        return NotificationMapper.toNotificationResponse(notification);
    }

    @Override
    public List<NotificationResponse> getNotificationsByUserId(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(NotificationMapper::toNotificationResponse)
                .toList();
    }

    @Override
    public List<NotificationResponse> getUnreadNotificationsByUserId(Long userId) {
        return notificationRepository.findByUserIdAndReadFalseOrderByCreatedAtDesc(userId)
                .stream()
                .map(NotificationMapper::toNotificationResponse)
                .toList();
    }

    @Override
    public NotificationResponse markAsRead(String id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + id));

        notification.setRead(true);

        Notification updatedNotification = notificationRepository.save(notification);

        return NotificationMapper.toNotificationResponse(updatedNotification);
    }

    @Override
    public void deleteNotification(String id) {
        if (!notificationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Notification not found with id: " + id);
        }

        notificationRepository.deleteById(id);
    }
}