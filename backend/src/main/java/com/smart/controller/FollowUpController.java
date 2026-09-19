package com.smart.controller;

import com.smart.entity.FollowUp;
import com.smart.service.FollowUpService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/followups")
@CrossOrigin(origins = "http://localhost:3000")
public class FollowUpController {

    private final FollowUpService followUpService;

    public FollowUpController(FollowUpService followUpService) {
        this.followUpService = followUpService;
    }

    @GetMapping("/patient/{patientId}")
    public List<FollowUp> getFollowUpsByPatientId(@PathVariable Integer patientId) {
        return followUpService.getFollowUpsByPatientId(patientId);
    }
}