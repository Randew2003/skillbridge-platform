package com.skillbridge.projectservice.event;

import com.skillbridge.projectservice.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class ProjectEventProducer {

    private final RabbitTemplate rabbitTemplate;

    public ProjectEventProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendProjectNotification(NotificationEvent event) {
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.NOTIFICATION_EXCHANGE,
                RabbitMQConfig.PROJECT_NOTIFICATION_ROUTING_KEY,
                event
        );

        System.out.println("Project notification event sent to RabbitMQ");
    }
}