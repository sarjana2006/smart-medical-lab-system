package com.smart.service;

import com.smart.entity.TestResult;
import com.smart.repository.TestResultRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestResultService {

    private final TestResultRepository testResultRepository;

    public TestResultService(TestResultRepository testResultRepository) {
        this.testResultRepository = testResultRepository;
    }

    public List<TestResult> getResultsByReportId(Integer reportId) {
        return testResultRepository.findByReportId(reportId);
    }
}