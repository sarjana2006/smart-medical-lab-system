import React, { useState } from "react";
import axios from "axios";
import "./App.css";

import TestList from "./TestList";
import MyBookings from "./MyBookings";
import SampleTracking from "./SampleTracking";

function App() {

  // =========================
  // PAGE STATES
  // =========================

  const [isLogin, setIsLogin] = useState(true);
  const [isDashboard, setIsDashboard] = useState(false);

  const [showTests, setShowTests] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [showTracking, setShowTracking] = useState(false);

  // =========================
  // LOGIN DATA
  // =========================

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // =========================
  // REGISTER DATA
  // =========================

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const [message, setMessage] = useState("");


  // =========================
  // LOGIN
  // =========================

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
            password: loginData.password
          }
        }
      );

      if (response.data === "Login successful") {

        setIsDashboard(true);

        setShowTests(false);
        setShowBookings(false);
        setShowTracking(false);

      } else {

        setMessage("Invalid email or password");

      }

    } catch (error) {

      console.error(error);

      setMessage("Invalid email or password");

    }
  };


  // =========================
  // REGISTER
  // =========================

  const handleRegister = async (e) => {

    e.preventDefault();

    setMessage("");

    try {

      await axios.post(
        "http://localhost:8080/patient/register",
        registerData
      );

      setMessage(
        "Registration successful! Please login."
      );

      setIsLogin(true);

      setRegisterData({
        name: "",
        email: "",
        phone: "",
        password: ""
      });

    } catch (error) {

      console.error(error);

      setMessage(
        "Registration failed. Please try again."
      );

    }
  };


  // =========================
  // SAMPLE TRACKING PAGE
  // =========================

  if (showTracking) {

    return (
      <SampleTracking
        patientId={1}
        onBack={() => setShowTracking(false)}
      />
    );

  }


  // =========================
  // MY BOOKINGS PAGE
  // =========================

  if (showBookings) {

    return (
      <MyBookings
        patientId={1}
        onBack={() => setShowBookings(false)}
      />
    );

  }


  // =========================
  // TEST LIST PAGE
  // =========================

  if (showTests) {

    return (
      <TestList
        onBack={() => setShowTests(false)}
      />
    );

  }


  // =========================
  // PATIENT DASHBOARD
  // =========================

  if (isDashboard) {

    return (

      <div className="dashboard-container">

        {/* DASHBOARD HEADER */}

        <div className="dashboard-header">

          <div>

            <h1>
              Smart Medical Lab
            </h1>

            <p>
              Patient Dashboard
            </p>

          </div>

          <button
            className="logout-button"
            onClick={() => {

              setIsDashboard(false);

              setShowTests(false);
              setShowBookings(false);
              setShowTracking(false);

              setLoginData({
                email: "",
                password: ""
              });

            }}
          >
            Logout
          </button>

        </div>


        {/* WELCOME BOX */}

        <div className="welcome-box">

          <h2>
            Welcome to Smart Medical Lab
          </h2>

          <p>
            Manage your lab tests, bookings, reports
            and follow-ups from one place.
          </p>

        </div>


        {/* DASHBOARD GRID */}

        <div className="dashboard-grid">


          {/* BOOK TEST */}

          <div className="dashboard-card">

            <h3>
              Book Test
            </h3>

            <p>
              Search and book available
              laboratory tests.
            </p>

            <button
              onClick={() => {
                setShowTests(true);
              }}
            >
              Book Test
            </button>

          </div>


          {/* MY BOOKINGS */}

          <div className="dashboard-card">

            <h3>
              My Bookings
            </h3>

            <p>
              View your upcoming and previous
              test bookings.
            </p>

            <button
              onClick={() => {
                setShowBookings(true);
              }}
            >
              View Bookings
            </button>

          </div>


          {/* SAMPLE TRACKING */}

          <div className="dashboard-card">

            <h3>
              Sample Tracking
            </h3>

            <p>
              Track your sample collection
              and testing status.
            </p>

            <button
              onClick={() => {
                setShowTracking(true);
              }}
            >
              Track Sample
            </button>

          </div>


          {/* REPORTS */}

          <div className="dashboard-card">

            <h3>
              My Reports
            </h3>

            <p>
              View your digital laboratory
              reports.
            </p>

            <button>
              View Reports
            </button>

          </div>


          {/* RESULT TRENDS */}

          <div className="dashboard-card">

            <h3>
              Result Trends
            </h3>

            <p>
              Compare your previous and
              current test results.
            </p>

            <button>
              View Trends
            </button>

          </div>


          {/* FOLLOW UPS */}

          <div className="dashboard-card">

            <h3>
              Follow-ups
            </h3>

            <p>
              View reminders and recommended
              follow-up tests.
            </p>

            <button>
              View Follow-ups
            </button>

          </div>

        </div>

      </div>

    );
  }


  // =========================
  // LOGIN / REGISTER PAGE
  // =========================

  return (

    <div className="app-container">

      <div className="login-card">


        {/* LEFT SIDE */}

        <div className="welcome-section">

          <div className="medical-icon">
            ✚
          </div>

          <h1>
            Smart Medical Lab
          </h1>

          <p>
            Test Booking, Digital Reports &
            Follow-up Management System
          </p>

          <div className="feature-list">

            <div>
              ✓ Easy Test Booking
            </div>

            <div>
              ✓ Digital Lab Reports
            </div>

            <div>
              ✓ Report Tracking
            </div>

            <div>
              ✓ Follow-up Reminders
            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="form-section">


          {/* LOGIN */}

          {isLogin ? (

            <>

              <h2>
                Welcome Back
              </h2>

              <p className="form-subtitle">
                Login to your patient account
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

            </>

          ) : (

            /* =========================
               REGISTER
               ========================= */

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

        </div>

      </div>

    </div>

  );
}

export default App;