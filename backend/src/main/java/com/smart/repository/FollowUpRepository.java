package com.smart.repository;

import com.smart.entity.FollowUp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowUpRepository extends JpaRepository<FollowUp, Integer> {

    List<FollowUp> findByPatientId(Integer patientId);
}