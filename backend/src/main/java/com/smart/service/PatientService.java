package com.smart.service;

import com.smart.entity.Patient;
import com.smart.repository.PatientRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;

    public PatientService(PatientRepository patientRepository,
                          PasswordEncoder passwordEncoder) {
        this.patientRepository = patientRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Patient Registration
    public Patient register(Patient patient) {

        Optional<Patient> existingPatient =
                patientRepository.findByEmail(patient.getEmail());

        if (existingPatient.isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        String encodedPassword =
                passwordEncoder.encode(patient.getPassword());

        patient.setPassword(encodedPassword);

        // New registrations are Patient users
        patient.setRole("PATIENT");

        return patientRepository.save(patient);
    }

    // Patient Login
    public Optional<Patient> login(String email, String password) {

        Optional<Patient> patient =
                patientRepository.findByEmail(email);

        if (patient.isPresent()) {

            boolean passwordMatches =
                    passwordEncoder.matches(
                            password,
                            patient.get().getPassword()
                    );

            if (passwordMatches) {
                return patient;
            }
        }

        return Optional.empty();
    }
}