package com.smart.controller;

import com.smart.entity.Patient;
import com.smart.service.PatientService;
import com.smart.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/patient")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://smart-medical-lab-system.vercel.app"
})
public class PatientController {

    private final PatientService patientService;
    private final JwtService jwtService;

    public PatientController(PatientService patientService,
                             JwtService jwtService) {
        this.patientService = patientService;
        this.jwtService = jwtService;
    }

    // Patient / Admin Login
    @PostMapping("/login")
    public Map<String, String> login(
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String role) {

        Optional<Patient> patient =
                patientService.login(email, password);

        Map<String, String> response = new HashMap<>();

        if (patient.isPresent()) {

            // Check selected account type
            if (!patient.get().getRole().equalsIgnoreCase(role)) {
                response.put("message", "Invalid account type");
                return response;
            }

            String token = jwtService.generateToken(
                    patient.get().getEmail(),
                    patient.get().getRole()
            );

            response.put("message", "Login successful");
            response.put("token", token);
            response.put("role", patient.get().getRole());

            return response;
        }

        response.put("message", "Invalid email or password");

        return response;
    }

    // Patient Registration
    @PostMapping("/register")
    public Patient register(@RequestBody Patient patient) {
        return patientService.register(patient);
    }

    // Admin: Get all patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    // Admin: Get patient by ID
    @GetMapping("/{patientId}")
    public Patient getPatientById(
            @PathVariable int patientId) {

        return patientService.getPatientById(patientId);
    }

    // Admin: Update patient
    @PutMapping("/{patientId}")
    public Patient updatePatient(
            @PathVariable int patientId,
            @RequestBody Patient patient) {

        return patientService.updatePatient(
                patientId,
                patient
        );
    }

    // Admin: Delete patient
    @DeleteMapping("/{patientId}")
    public ResponseEntity<String> deletePatient(
            @PathVariable int patientId) {

        patientService.deletePatient(patientId);

        return ResponseEntity.ok(
                "Patient deleted successfully"
        );
    }
}