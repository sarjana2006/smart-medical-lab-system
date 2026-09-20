package com.smart.service;

import com.smart.entity.Patient;
import com.smart.repository.PatientRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
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

    // Admin: Get all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Admin: Get patient by ID
    public Patient getPatientById(int patientId) {

        return patientRepository.findById(patientId)
                .orElseThrow(() ->
                        new RuntimeException("Patient not found"));
    }

    // Admin: Update patient
    public Patient updatePatient(
            int patientId,
            Patient updatedPatient) {

        Patient existingPatient =
                patientRepository.findById(patientId)
                        .orElseThrow(() ->
                                new RuntimeException("Patient not found"));

        existingPatient.setName(updatedPatient.getName());
        existingPatient.setEmail(updatedPatient.getEmail());
        existingPatient.setPhone(updatedPatient.getPhone());

        return patientRepository.save(existingPatient);
    }

    // Admin: Delete patient
    public void deletePatient(int patientId) {

        if (!patientRepository.existsById(patientId)) {
            throw new RuntimeException("Patient not found");
        }

        patientRepository.deleteById(patientId);
    }
}