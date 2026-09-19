package com.smart.controller;

import com.smart.entity.Patient;
import com.smart.service.PatientService;
import com.smart.service.JwtService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/patient")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    private final PatientService patientService;
    private final JwtService jwtService;

    public PatientController(PatientService patientService,
                             JwtService jwtService) {
        this.patientService = patientService;
        this.jwtService = jwtService;
    }

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

    @PostMapping("/register")
    public Patient register(@RequestBody Patient patient) {
        return patientService.register(patient);
    }
}