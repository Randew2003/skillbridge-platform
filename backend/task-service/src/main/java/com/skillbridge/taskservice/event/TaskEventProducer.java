package com.skillbridge.taskservice.event;

import com.skillbridge.taskservice.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class TaskEventProducer {

    private final RabbitTemplate rabbitTemplate;

    public TaskEventProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendTaskNotification(NotificationEvent event) {
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.NOTIFICATION_EXCHANGE,
                RabbitMQConfig.TASK_NOTIFICATION_ROUTING_KEY,
                event
        );

        System.out.println("Task notification event sent to RabbitMQ");
    }
}