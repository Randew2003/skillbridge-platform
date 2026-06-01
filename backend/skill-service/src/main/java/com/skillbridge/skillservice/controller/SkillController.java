package com.skillbridge.skillservice.controller;

import com.skillbridge.skillservice.dto.request.SkillRequest;
import com.skillbridge.skillservice.dto.response.SkillResponse;
import com.skillbridge.skillservice.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    public ResponseEntity<SkillResponse> createOrUpdateSkills(@Valid @RequestBody SkillRequest request) {
        return ResponseEntity.ok(skillService.createOrUpdateSkills(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkillResponse> getSkillById(@PathVariable String id) {
        return ResponseEntity.ok(skillService.getSkillById(id));
    }

    @GetMapping
    public ResponseEntity<List<SkillResponse>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<SkillResponse> getSkillsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(skillService.getSkillsByUserId(userId));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<SkillResponse> getSkillsByProjectId(@PathVariable Long projectId) {
        return ResponseEntity.ok(skillService.getSkillsByProjectId(projectId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<SkillResponse>> searchBySkill(@RequestParam String skill) {
        return ResponseEntity.ok(skillService.searchBySkill(skill));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSkill(@PathVariable String id) {
        skillService.deleteSkill(id);
        return ResponseEntity.ok("Skill record deleted successfully");
    }
}