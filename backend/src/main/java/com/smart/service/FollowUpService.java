package com.smart.service;

import com.smart.entity.FollowUp;
import com.smart.repository.FollowUpRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowUpService {

    private final FollowUpRepository followUpRepository;

    public FollowUpService(FollowUpRepository followUpRepository) {
        this.followUpRepository = followUpRepository;
    }

    public List<FollowUp> getFollowUpsByPatientId(Integer patientId) {
        return followUpRepository.findByPatientId(patientId);
    }
}