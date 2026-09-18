package com.smart.repository;

import com.smart.entity.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestResultRepository extends JpaRepository<TestResult, Integer> {

    List<TestResult> findByReportId(Integer reportId);
}