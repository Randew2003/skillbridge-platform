package com.skillbridge.skillservice.service;

import com.skillbridge.skillservice.dto.request.SkillRequest;
import com.skillbridge.skillservice.dto.response.SkillResponse;

import java.util.List;

public interface SkillService {

    SkillResponse createOrUpdateSkills(SkillRequest request);

    SkillResponse getSkillById(String id);

    List<SkillResponse> getAllSkills();

    SkillResponse getSkillsByUserId(Long userId);

    SkillResponse getSkillsByProjectId(Long projectId);

    List<SkillResponse> searchBySkill(String skill);

    void deleteSkill(String id);
}