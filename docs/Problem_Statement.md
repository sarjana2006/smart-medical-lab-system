# Problem Statement

## 1. Title

Smart Medical Lab Test Booking, Report & Follow-up Management System

## 2. Domain

Healthcare / Medical Laboratory Management

## 3. Who is the user?

### Patient
- Register and login
- Search and book lab tests
- Select lab visit or home collection
- Track sample status
- View and download reports
- Compare previous results
- Manage follow-up reminders
- Book next test
- Share selected reports with doctors

### Lab Admin / Staff
- Manage laboratory and tests
- Manage prices and time slots
- Manage technician availability
- Manage patient bookings
- Manage sample collection
- Upload test results and reports
- Manage follow-ups and alerts

## 4. What problem are we solving?

Patients may receive lab reports but have difficulty tracking sample status, comparing previous results, remembering follow-ups, and booking the next test. Lab staff also need to manage bookings, sample collection, technicians, and reports efficiently. This system connects the complete process in one platform.

## 5. Proposed Solution

- Test search and booking
- Test preparation information
- Home sample collection
- Smart slot and technician allocation
- Sample journey tracking
- Digital report management
- Previous/current result comparison
- Follow-up reminders
- Next test booking
- Controlled doctor report sharing
- Critical-value alerts

## 6. Core Entities / Database Tables

- User
- Laboratory
- Lab Test
- Booking
- Time Slot
- Technician
- Sample
- Report
- Test Result
- Follow-up

## 7. User Roles & Permissions

### Patient
- Book tests
- Track samples
- View reports
- Compare results
- Manage follow-ups

### Lab Admin / Staff
- Manage tests
- Manage bookings
- Assign technicians
- Manage samples
- Manage reports

## 8. Success Criteria

- Successful test booking
- No double booking
- Sample status tracking
- Digital report access
- Result comparison
- Follow-up reminders
- Next test booking
- Controlled report sharing

## 9. Out of Scope

- Medical diagnosis
- Disease prediction
- Treatment recommendations
- Real laboratory equipment integration
- Full hospital management

## 10. Chosen Track

Java (Spring Boot)