import React, { useState } from "react";
import axios from "axios";
import "./App.css";

import TestList from "./TestList";
import MyBookings from "./MyBookings";
import SampleTracking from "./SampleTracking";
import Reports from "./Reports";
import ResultTrends from "./ResultTrends";
import FollowUps from "./FollowUps";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isDashboard, setIsDashboard] = useState(false);
  const [userRole, setUserRole] = useState("");

  const [showTests, setShowTests] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showResultTrends, setShowResultTrends] = useState(false);
  const [showFollowUps, setShowFollowUps] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const [selectedRole, setSelectedRole] = useState("");
  const [message, setMessage] = useState("");

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/patient/login",
        null,
        {
          params: {
            email: loginData.email,
            password: loginData.password,
            role: selectedRole
          }
        }
      );

      if (response.data.message === "Login successful") {

        localStorage.setItem("token", response.data.token);

        setUserRole(response.data.role);
        setIsDashboard(true);

        setShowTests(false);
        setShowBookings(false);
        setShowTracking(false);
        setShowReports(false);
        setShowResultTrends(false);
        setShowFollowUps(false);

      } else {

        // Show backend message
        setMessage(response.data.message);
      }

    } catch (error) {

      console.error(error);
      setMessage("Login failed. Please try again.");

    }
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(
        "http://localhost:8080/patient/register",
        registerData
      );

      setMessage("Registration successful! Please login.");
      setIsLogin(true);

      setRegisterData({
        name: "",
        email: "",
        phone: "",
        password: ""
      });

    } catch (error) {

      console.error(error);
      setMessage("Registration failed. Please try again.");

    }
  };

  // SAMPLE TRACKING
  if (showTracking) {
    return (
      <SampleTracking
        patientId={1}
        onBack={() => setShowTracking(false)}
      />
    );
  }

  // REPORTS
  if (showReports) {
    return (
      <Reports
        patientId={1}
        onBack={() => setShowReports(false)}
      />
    );
  }

  // RESULT TRENDS
  if (showResultTrends) {
    return (
      <ResultTrends
        reportId={1}
        onBack={() => setShowResultTrends(false)}
      />
    );
  }

  // MY BOOKINGS
  if (showBookings) {
    return (
      <MyBookings
        patientId={1}
        onBack={() => setShowBookings(false)}
      />
    );
  }

  // TEST LIST
  if (showTests) {
    return (
      <TestList
        onBack={() => setShowTests(false)}
      />
    );
  }

  // FOLLOW UPS
  if (showFollowUps) {
    return (
      <FollowUps
        patientId={1}
        onBack={() => setShowFollowUps(false)}
      />
    );
  }

  // ADMIN DASHBOARD
  if (isDashboard && userRole === "ADMIN") {
    return (
      <div className="dashboard-container">

        <div className="dashboard-header">

          <div>
            <h1>Smart Medical Lab</h1>
            <p>Admin Dashboard</p>
          </div>

          <button
            className="logout-button"
            onClick={() => {

              localStorage.removeItem("token");

              setIsDashboard(false);
              setUserRole("");
              setSelectedRole("");

              setLoginData({
                email: "",
                password: ""
              });

            }}
          >
            Logout
          </button>

        </div>

        <div className="welcome-box">

          <h2>Welcome to Admin Account</h2>

          <p>
            Manage laboratory tests, bookings,
            reports and patient services.
          </p>

        </div>

        <div className="dashboard-grid">

          <div className="dashboard-card">

            <h3>Manage Tests</h3>

            <p>
              Add, update and manage laboratory tests.
            </p>

            <button>
              Manage Tests
            </button>

          </div>

          <div className="dashboard-card">

            <h3>Manage Bookings</h3>

            <p>
              View and manage patient bookings.
            </p>

            <button>
              Manage Bookings
            </button>

          </div>

          <div className="dashboard-card">

            <h3>Manage Reports</h3>

            <p>
              Manage patient laboratory reports.
            </p>

            <button>
              Manage Reports
            </button>

          </div>

          <div className="dashboard-card">

            <h3>Patient Management</h3>

            <p>
              View registered patients.
            </p>

            <button>
              View Patients
            </button>

          </div>

        </div>

      </div>
    );
  }

  // PATIENT DASHBOARD
  if (isDashboard && userRole === "PATIENT") {
    return (
      <div className="dashboard-container">

        <div className="dashboard-header">

          <div>
            <h1>Smart Medical Lab</h1>
            <p>Patient Dashboard</p>
          </div>

          <button
            className="logout-button"
            onClick={() => {

              localStorage.removeItem("token");

              setIsDashboard(false);
              setUserRole("");
              setSelectedRole("");

              setShowTests(false);
              setShowBookings(false);
              setShowTracking(false);
              setShowReports(false);
              setShowResultTrends(false);
              setShowFollowUps(false);

              setLoginData({
                email: "",
                password: ""
              });

            }}
          >
            Logout
          </button>

        </div>

        <div className="welcome-box">

          <h2>Welcome to Smart Medical Lab</h2>

          <p>
            Manage your lab tests, bookings, reports
            and follow-ups from one place.
          </p>

        </div>

        <div className="dashboard-grid">

          <div className="dashboard-card">

            <h3>Book Test</h3>

            <p>
              Search and book available
              laboratory tests.
            </p>

            <button
              onClick={() => setShowTests(true)}
            >
              Book Test
            </button>

          </div>

          <div className="dashboard-card">

            <h3>My Bookings</h3>

            <p>
              View your upcoming and previous
              test bookings.
            </p>

            <button
              onClick={() => setShowBookings(true)}
            >
              View Bookings
            </button>

          </div>

          <div className="dashboard-card">

            <h3>Sample Tracking</h3>

            <p>
              Track your sample collection
              and testing status.
            </p>

            <button
              onClick={() => setShowTracking(true)}
            >
              Track Sample
            </button>

          </div>

          <div className="dashboard-card">

            <h3>My Reports</h3>

            <p>
              View your digital laboratory
              reports.
            </p>

            <button
              onClick={() => setShowReports(true)}
            >
              View Reports
            </button>

          </div>

          <div className="dashboard-card">

            <h3>Result Trends</h3>

            <p>
              Compare your previous and
              current test results.
            </p>

            <button
              onClick={() => setShowResultTrends(true)}
            >
              View Trends
            </button>

          </div>

          <div className="dashboard-card">

            <h3>Follow-ups</h3>

            <p>
              View reminders and recommended
              follow-up tests.
            </p>

            <button
              onClick={() => setShowFollowUps(true)}
            >
              View Follow-ups
            </button>

          </div>

        </div>

      </div>
    );
  }

  // LOGIN / REGISTER PAGE
  return (
    <div className="app-container">

      <div className="login-card">

        <div className="welcome-section">

          <div className="medical-icon">
            ✚
          </div>

          <h1>Smart Medical Lab</h1>

          <p>
            Test Booking, Digital Reports &
            Follow-up Management System
          </p>

          <div className="feature-list">

            <div>✓ Easy Test Booking</div>
            <div>✓ Digital Lab Reports</div>
            <div>✓ Report Tracking</div>
            <div>✓ Follow-up Reminders</div>

          </div>

        </div>

        <div className="form-section">

          {/* ACCOUNT TYPE SELECTION */}

          {!selectedRole && (

            <div className="role-selection">

              <div className="role-heading">

                <div className="role-icon">
                  ✚
                </div>

                <h2>
                  Choose Account Type
                </h2>

                <p className="form-subtitle">
                  Select your account to continue
                </p>

              </div>

              <select
                className="role-select"
                value=""
                onChange={(e) => {

                  if (e.target.value !== "") {

                    setSelectedRole(e.target.value);
                    setIsLogin(true);
                    setMessage("");

                    setLoginData({
                      email: "",
                      password: ""
                    });

                  }

                }}
              >

                <option value="" disabled>
                  Select Account Type
                </option>

                <option value="PATIENT">
                  👤 Patient
                </option>

                <option value="ADMIN">
                  🛡️ Administrator
                </option>

              </select>

              <p className="secure-text">
                🔒 Secure access to your account
              </p>

            </div>

          )}

          {/* LOGIN / REGISTER */}

          {selectedRole && (

            <>

              <button
                className="link-button"
                onClick={() => {

                  setSelectedRole("");
                  setMessage("");

                  setLoginData({
                    email: "",
                    password: ""
                  });

                  setIsLogin(true);

                }}
              >
                ← Change Account Type
              </button>

              {isLogin ? (

                <>

                  <h2>
                    Welcome Back
                  </h2>

                  <p className="form-subtitle">

                    Login to your{" "}

                    {selectedRole === "ADMIN"
                      ? "admin"
                      : "patient"}{" "}

                    account

                  </p>

                  <form onSubmit={handleLogin}>

                    <label>
                      Email Address
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          email: e.target.value
                        })
                      }
                      required
                    />

                    <label>
                      Password
                    </label>

                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          password: e.target.value
                        })
                      }
                      required
                    />

                    <button
                      type="submit"
                      className="main-button"
                    >
                      Login
                    </button>

                  </form>

                  {message && (

                    <div className="message">
                      {message}
                    </div>

                  )}

                  {/* REGISTER ONLY FOR PATIENT */}

                  {selectedRole === "PATIENT" && (

                    <div className="switch-text">

                      Don't have an account?

                      <button
                        className="link-button"
                        onClick={() => {

                          setIsLogin(false);
                          setMessage("");

                        }}
                      >
                        Register
                      </button>

                    </div>

                  )}

                </>

              ) : (

                <>

                  <h2>
                    Create Account
                  </h2>

                  <p className="form-subtitle">
                    Register as a new patient
                  </p>

                  <form onSubmit={handleRegister}>

                    <label>
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={registerData.name}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          name: e.target.value
                        })
                      }
                      required
                    />

                    <label>
                      Email Address
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value
                        })
                      }
                      required
                    />

                    <label>
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={registerData.phone}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          phone: e.target.value
                        })
                      }
                      required
                    />

                    <label>
                      Password
                    </label>

                    <input
                      type="password"
                      placeholder="Create a password"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value
                        })
                      }
                      required
                    />

                    <button
                      type="submit"
                      className="main-button"
                    >
                      Create Account
                    </button>

                  </form>

                  {message && (

                    <div className="message">
                      {message}
                    </div>

                  )}

                  <div className="switch-text">

                    Already have an account?

                    <button
                      className="link-button"
                      onClick={() => {

                        setIsLogin(true);
                        setMessage("");

                      }}
                    >
                      Login
                    </button>

                  </div>

                </>

              )}

            </>

          )}

        </div>

      </div>

    </div>
  );
}

export default App;