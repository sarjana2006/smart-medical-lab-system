package com.smart.service;

import com.smart.entity.FollowUp;
import com.smart.repository.FollowUpRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FollowUpServiceTest {

    @Mock
    private FollowUpRepository followUpRepository;

    @InjectMocks
    private FollowUpService followUpService;

    @org.junit.jupiter.api.Test
    void getFollowUpsByPatientSuccessfully() {

        FollowUp followUp1 = new FollowUp();
        FollowUp followUp2 = new FollowUp();

        when(followUpRepository.findByPatientId(1))
                .thenReturn(Arrays.asList(
                        followUp1,
                        followUp2
                ));

        List<FollowUp> result =
                followUpService.getFollowUpsByPatientId(1);

        assertNotNull(result);
        assertEquals(2, result.size());

        verify(followUpRepository)
                .findByPatientId(1);
    }

    @org.junit.jupiter.api.Test
    void getFollowUpsByPatientWhenEmpty() {

        when(followUpRepository.findByPatientId(99))
                .thenReturn(Arrays.asList());

        List<FollowUp> result =
                followUpService.getFollowUpsByPatientId(99);

        assertNotNull(result);
        assertTrue(result.isEmpty());

        verify(followUpRepository)
                .findByPatientId(99);
    }
}