package com.smart.service;

import com.smart.entity.Test;
import com.smart.repository.TestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestService {

    private final TestRepository testRepository;

    public TestService(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    // Get all tests
    public List<Test> getAllTests() {
        return testRepository.findAll();
    }

    // Get test by ID
    public Optional<Test> getTestById(Integer id) {
        return testRepository.findById(id);
    }

    // Add test
    public Test addTest(Test test) {
        return testRepository.save(test);
    }

    // Update test
    public Test updateTest(Integer id, Test testDetails) {

        Optional<Test> existingTest =
                testRepository.findById(id);

        if (existingTest.isPresent()) {

            Test test = existingTest.get();

            test.setTestName(
                    testDetails.getTestName()
            );

            test.setDescription(
                    testDetails.getDescription()
            );

            test.setPreparationInstructions(
                    testDetails.getPreparationInstructions()
            );

            test.setPrice(
                    testDetails.getPrice()
            );

            test.setFastingRequired(
                    testDetails.isFastingRequired()
            );

            test.setAvailable(
                    testDetails.isAvailable()
            );

            return testRepository.save(test);
        }

        return null;
    }

    // Delete test
    public void deleteTest(Integer id) {
        testRepository.deleteById(id);
    }
}