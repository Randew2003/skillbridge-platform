package com.skillbridge.projectservice.client;

import com.skillbridge.projectservice.dto.response.UserProfileSummaryResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "USER-SERVICE")
public interface UserServiceClient {

    @GetMapping("/api/users/{userId}/profile-summary")
    UserProfileSummaryResponse getUserProfileSummary(
            @PathVariable Long userId,
            @RequestHeader("Authorization") String authorizationHeader
    );
}