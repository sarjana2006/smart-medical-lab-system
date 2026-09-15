package com.smart.controller;
import com.smart.entity.Patient;
import com.smart.service.PatientService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/patient")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping("/login")
    public String login(
            @RequestParam String email,
            @RequestParam String password) {

        boolean result = patientService.login(email, password);

        if (result) {
            return "Login successful";
        }

        return "Invalid email or password";
    }

    @PostMapping("/register")
    public Patient register(@RequestBody Patient patient) {
        return patientService.register(patient);
    }
}