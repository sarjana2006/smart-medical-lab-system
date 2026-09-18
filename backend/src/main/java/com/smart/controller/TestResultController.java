package com.smart.controller;

import com.smart.entity.TestResult;
import com.smart.service.TestResultService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/test-result")
@CrossOrigin(origins = "http://localhost:3000")
public class TestResultController {

    private final TestResultService testResultService;

    public TestResultController(TestResultService testResultService) {
        this.testResultService = testResultService;
    }

    @GetMapping("/report/{reportId}")
    public List<TestResult> getResultsByReportId(
            @PathVariable Integer reportId) {

        return testResultService.getResultsByReportId(reportId);
    }
}