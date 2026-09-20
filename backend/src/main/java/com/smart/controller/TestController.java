package com.smart.controller;

import com.smart.entity.Test;
import com.smart.service.TestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tests")
@CrossOrigin(origins = {"http://localhost:3000", "https://smart-medical-lab-system.vercel.app"})
public class TestController {

    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    // Patient - Get available tests
    @GetMapping
    public List<Test> getAvailableTests() {
        return testService.getAllTests()
                .stream()
                .filter(Test::isAvailable)
                .toList();
    }

    // Admin - Get all tests
    @GetMapping("/all")
    public List<Test> getAllTests() {
        return testService.getAllTests();
    }

    // Admin - Get test by ID
    @GetMapping("/{id}")
    public Optional<Test> getTestById(
            @PathVariable Integer id) {

        return testService.getTestById(id);
    }

    // Admin - Add new test
    @PostMapping
    public Test addTest(@RequestBody Test test) {
        return testService.addTest(test);
    }

    // Admin - Update test
    @PutMapping("/{id}")
    public Test updateTest(
            @PathVariable Integer id,
            @RequestBody Test test) {

        return testService.updateTest(id, test);
    }

    // Admin - Delete test
    @DeleteMapping("/{id}")
    public String deleteTest(
            @PathVariable Integer id) {

        testService.deleteTest(id);

        return "Test deleted successfully";
    }
}