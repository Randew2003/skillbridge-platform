package com.skillbridge.skillservice.service.impl;

import com.skillbridge.skillservice.document.Skill;
import com.skillbridge.skillservice.dto.request.SkillRequest;
import com.skillbridge.skillservice.dto.response.SkillResponse;
import com.skillbridge.skillservice.exception.ResourceNotFoundException;
import com.skillbridge.skillservice.mapper.SkillMapper;
import com.skillbridge.skillservice.repository.SkillRepository;
import com.skillbridge.skillservice.service.SkillService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;

    public SkillServiceImpl(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Override
    public SkillResponse createOrUpdateSkills(SkillRequest request) {
        validateRequest(request);

        Skill skill = findExistingSkill(request);

        if (skill == null) {
            skill = new Skill();
            skill.setCreatedAt(LocalDateTime.now());
        }

        skill.setUserId(request.getUserId());
        skill.setProjectId(request.getProjectId());
        skill.setType(request.getType().toUpperCase());
        skill.setSkills(request.getSkills());
        skill.setUpdatedAt(LocalDateTime.now());

        Skill savedSkill = skillRepository.save(skill);
        return SkillMapper.toSkillResponse(savedSkill);
    }

    @Override
    public SkillResponse getSkillById(String id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill record not found with id: " + id));

        return SkillMapper.toSkillResponse(skill);
    }

    @Override
    public List<SkillResponse> getAllSkills() {
        return skillRepository.findAll()
                .stream()
                .map(SkillMapper::toSkillResponse)
                .toList();
    }

    @Override
    public SkillResponse getSkillsByUserId(Long userId) {
        Skill skill = skillRepository.findByUserIdAndType(userId, "USER")
                .orElseThrow(() -> new ResourceNotFoundException("Skills not found for user id: " + userId));

        return SkillMapper.toSkillResponse(skill);
    }

    @Override
    public SkillResponse getSkillsByProjectId(Long projectId) {
        Skill skill = skillRepository.findByProjectIdAndType(projectId, "PROJECT")
                .orElseThrow(() -> new ResourceNotFoundException("Skills not found for project id: " + projectId));

        return SkillMapper.toSkillResponse(skill);
    }

    @Override
    public List<SkillResponse> searchBySkill(String skill) {
        return skillRepository.findBySkillsContainingIgnoreCase(skill)
                .stream()
                .map(SkillMapper::toSkillResponse)
                .toList();
    }

    @Override
    public void deleteSkill(String id) {
        if (!skillRepository.existsById(id)) {
            throw new ResourceNotFoundException("Skill record not found with id: " + id);
        }

        skillRepository.deleteById(id);
    }

    private Skill findExistingSkill(SkillRequest request) {
        String type = request.getType().toUpperCase();

        if (type.equals("USER") && request.getUserId() != null) {
            return skillRepository.findByUserIdAndType(request.getUserId(), "USER").orElse(null);
        }

        if (type.equals("PROJECT") && request.getProjectId() != null) {
            return skillRepository.findByProjectIdAndType(request.getProjectId(), "PROJECT").orElse(null);
        }

        return null;
    }

    private void validateRequest(SkillRequest request) {
        String type = request.getType().toUpperCase();

        if (!type.equals("USER") && !type.equals("PROJECT")) {
            throw new RuntimeException("Invalid type. Use USER or PROJECT");
        }

        if (type.equals("USER") && request.getUserId() == null) {
            throw new RuntimeException("userId is required for USER skills");
        }

        if (type.equals("PROJECT") && request.getProjectId() == null) {
            throw new RuntimeException("projectId is required for PROJECT skills");
        }
    }
}