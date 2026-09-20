package com.smart.service;

import com.smart.entity.Patient;
import com.smart.repository.PatientRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PatientServiceTest {

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private PatientService patientService;

    @Test
    void registerPatientSuccessfully() {

        Patient patient = new Patient();
        patient.setName("Test Patient");
        patient.setEmail("test@gmail.com");
        patient.setPassword("test123");
        patient.setPhone("9876543210");

        when(patientRepository.findByEmail("test@gmail.com"))
                .thenReturn(Optional.empty());

        when(passwordEncoder.encode("test123"))
                .thenReturn("encodedPassword");

        when(patientRepository.save(any(Patient.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Patient result = patientService.register(patient);

        assertNotNull(result);
        assertEquals("Test Patient", result.getName());
        assertEquals("test@gmail.com", result.getEmail());
        assertEquals("PATIENT", result.getRole());
        assertEquals("encodedPassword", result.getPassword());

        verify(patientRepository).save(patient);
    }

    @Test
    void registerPatientWithExistingEmail() {

        Patient patient = new Patient();
        patient.setEmail("existing@gmail.com");
        patient.setPassword("test123");

        when(patientRepository.findByEmail("existing@gmail.com"))
                .thenReturn(Optional.of(patient));

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> patientService.register(patient)
        );

        assertEquals(
                "Email already registered",
                exception.getMessage()
        );

        verify(patientRepository, never()).save(any(Patient.class));
    }

    @Test
    void loginSuccessfully() {

        Patient patient = new Patient();
        patient.setEmail("test@gmail.com");
        patient.setPassword("encodedPassword");

        when(patientRepository.findByEmail("test@gmail.com"))
                .thenReturn(Optional.of(patient));

        when(passwordEncoder.matches(
                "test123",
                "encodedPassword"
        )).thenReturn(true);

        Optional<Patient> result =
                patientService.login(
                        "test@gmail.com",
                        "test123"
                );

        assertTrue(result.isPresent());
        assertEquals(
                "test@gmail.com",
                result.get().getEmail()
        );
    }

    @Test
    void loginWithWrongPassword() {

        Patient patient = new Patient();
        patient.setEmail("test@gmail.com");
        patient.setPassword("encodedPassword");

        when(patientRepository.findByEmail("test@gmail.com"))
                .thenReturn(Optional.of(patient));

        when(passwordEncoder.matches(
                "wrongPassword",
                "encodedPassword"
        )).thenReturn(false);

        Optional<Patient> result =
                patientService.login(
                        "test@gmail.com",
                        "wrongPassword"
                );

        assertTrue(result.isEmpty());
    }
}