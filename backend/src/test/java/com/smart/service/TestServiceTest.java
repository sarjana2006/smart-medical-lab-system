package com.smart.service;

import com.smart.entity.Test;
import com.smart.repository.TestRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TestServiceTest {

    @Mock
    private TestRepository testRepository;

    @InjectMocks
    private TestService testService;

    @org.junit.jupiter.api.Test
    void getAllTestsSuccessfully() {

        Test test1 = new Test();
        test1.setTestId(1);
        test1.setTestName("Blood Test");

        Test test2 = new Test();
        test2.setTestId(2);
        test2.setTestName("Lipid Profile");

        when(testRepository.findAll())
                .thenReturn(Arrays.asList(test1, test2));

        var result = testService.getAllTests();

        assertEquals(2, result.size());
        assertEquals("Blood Test", result.get(0).getTestName());
        assertEquals("Lipid Profile", result.get(1).getTestName());

        verify(testRepository).findAll();
    }

    @org.junit.jupiter.api.Test
    void getTestByIdSuccessfully() {

        Test test = new Test();
        test.setTestId(1);
        test.setTestName("Blood Test");

        when(testRepository.findById(1))
                .thenReturn(Optional.of(test));

        Optional<Test> result =
                testService.getTestById(1);

        assertTrue(result.isPresent());
        assertEquals(1, result.get().getTestId());
        assertEquals("Blood Test", result.get().getTestName());

        verify(testRepository).findById(1);
    }

    @org.junit.jupiter.api.Test
    void getTestByIdWhenNotFound() {

        when(testRepository.findById(99))
                .thenReturn(Optional.empty());

        Optional<Test> result =
                testService.getTestById(99);

        assertTrue(result.isEmpty());

        verify(testRepository).findById(99);
    }

    @org.junit.jupiter.api.Test
    void addTestSuccessfully() {

        Test test = new Test();
        test.setTestName("CBC Test");

        when(testRepository.save(any(Test.class)))
                .thenAnswer(invocation ->
                        invocation.getArgument(0));

        Test result =
                testService.addTest(test);

        assertNotNull(result);
        assertEquals("CBC Test", result.getTestName());

        verify(testRepository).save(test);
    }

    @org.junit.jupiter.api.Test
    void updateTestSuccessfully() {

        Test existingTest = new Test();
        existingTest.setTestId(1);
        existingTest.setTestName("Old Test");

        Test updatedTest = new Test();
        updatedTest.setTestName("Updated Test");
        updatedTest.setDescription("Updated description");
        updatedTest.setPreparationInstructions("Fasting required");
        updatedTest.setPrice(500.0);
        updatedTest.setFastingRequired(true);
        updatedTest.setAvailable(true);

        when(testRepository.findById(1))
                .thenReturn(Optional.of(existingTest));

        when(testRepository.save(any(Test.class)))
                .thenAnswer(invocation ->
                        invocation.getArgument(0));

        Test result =
                testService.updateTest(1, updatedTest);

        assertNotNull(result);
        assertEquals("Updated Test", result.getTestName());
        assertEquals("Updated description", result.getDescription());
        assertEquals("Fasting required",
                result.getPreparationInstructions());
        assertEquals(500.0, result.getPrice());
        assertTrue(result.isFastingRequired());
        assertTrue(result.isAvailable());

        verify(testRepository).findById(1);
        verify(testRepository).save(existingTest);
    }

    @org.junit.jupiter.api.Test
    void updateTestWhenNotFound() {

        Test updatedTest = new Test();

        when(testRepository.findById(99))
                .thenReturn(Optional.empty());

        Test result =
                testService.updateTest(99, updatedTest);

        assertNull(result);

        verify(testRepository).findById(99);

        verify(testRepository, never())
                .save(any(Test.class));
    }

    @org.junit.jupiter.api.Test
    void deleteTestSuccessfully() {

        doNothing()
                .when(testRepository)
                .deleteById(1);

        testService.deleteTest(1);

        verify(testRepository).deleteById(1);
    }
}