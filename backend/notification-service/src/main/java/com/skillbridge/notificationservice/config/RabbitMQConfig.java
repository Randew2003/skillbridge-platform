package com.skillbridge.notificationservice.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String NOTIFICATION_EXCHANGE = "notification.exchange";

    public static final String PROJECT_NOTIFICATION_QUEUE = "project.notification.queue";
    public static final String TASK_NOTIFICATION_QUEUE = "task.notification.queue";

    public static final String PROJECT_NOTIFICATION_ROUTING_KEY = "project.notification";
    public static final String TASK_NOTIFICATION_ROUTING_KEY = "task.notification";

    @Bean
    public DirectExchange notificationExchange() {
        return new DirectExchange(NOTIFICATION_EXCHANGE);
    }

    @Bean
    public Queue projectNotificationQueue() {
        return new Queue(PROJECT_NOTIFICATION_QUEUE);
    }

    @Bean
    public Queue taskNotificationQueue() {
        return new Queue(TASK_NOTIFICATION_QUEUE);
    }

    @Bean
    public Binding projectNotificationBinding() {
        return BindingBuilder
                .bind(projectNotificationQueue())
                .to(notificationExchange())
                .with(PROJECT_NOTIFICATION_ROUTING_KEY);
    }

    @Bean
    public Binding taskNotificationBinding() {
        return BindingBuilder
                .bind(taskNotificationQueue())
                .to(notificationExchange())
                .with(TASK_NOTIFICATION_ROUTING_KEY);
    }
}