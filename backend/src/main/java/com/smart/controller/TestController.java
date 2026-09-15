package com.smart.controller;

import com.smart.entity.Test;
import com.smart.repository.TestRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tests")
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {

    private final TestRepository testRepository;

    public TestController(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    @GetMapping
    public List<Test> getAvailableTests() {
        return testRepository.findByAvailableTrue();
    }
}