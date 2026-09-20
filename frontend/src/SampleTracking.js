import React, { useEffect, useState } from "react";
import axios from "axios";

function SampleTracking({ patientId, onBack }) {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    axios
      .get(`https://smart-medical-lab-backend.onrender.com/booking/patient/${patientId}`)
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load sample tracking.");
        setLoading(false);
      });

  }, [patientId]);

  return (
    <div className="tracking-page">

      <div className="tracking-topbar">

        <button
          className="tracking-back-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

      </div>

      <div className="tracking-title">

        <div className="tracking-icon">
          ✓
        </div>

        <div>
          <h1>Sample Tracking</h1>

          <p>
            Track your sample journey from booking to report
          </p>
        </div>

      </div>

      {loading && (
        <div className="tracking-message">
          <div className="loading-icon">⟳</div>
          <p>Loading sample status...</p>
        </div>
      )}

      {error && (
        <div className="tracking-error">
          {error}
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="tracking-empty">

          <div className="empty-tracking-icon">
            📋
          </div>

          <h2>No Bookings Available</h2>

          <p>
            You don't have any bookings available for tracking.
          </p>

        </div>
      )}

      <div className="tracking-list">

        {bookings.map((booking) => (

          <div
            className="tracking-card"
            key={booking.bookingId}
          >

            <div className="tracking-card-header">

              <div>
                <span className="tracking-label">
                  BOOKING
                </span>

                <h2>
                  #{booking.bookingId}
                </h2>
              </div>

              <div className="current-status-badge">
                {booking.sampleStatus}
              </div>

            </div>

            <div className="tracking-details">

              <div className="tracking-detail">
                <span>Test ID</span>
                <strong>{booking.testId}</strong>
              </div>

              <div className="tracking-detail">
                <span>Date</span>
                <strong>{booking.bookingDate}</strong>
              </div>

              <div className="tracking-detail">
                <span>Time</span>
                <strong>{booking.bookingTime}</strong>
              </div>

              <div className="tracking-detail">
                <span>Collection</span>
                <strong>{booking.collectionType}</strong>
              </div>

            </div>

            <div className="sample-current-status">

              <p>Current Sample Status</p>

              <div className="sample-status-highlight">
                {booking.sampleStatus}
              </div>

            </div>

            <div className="journey-section">

              <h3>Sample Journey</h3>

              <div className="journey">

                <div
                  className={
                    booking.sampleStatus === "BOOKING CONFIRMED"
                      ? "journey-step active"
                      : "journey-step"
                  }
                >
                  <div className="journey-circle">
                    ✓
                  </div>

                  <div>
                    <strong>Booking Confirmed</strong>
                    <span>Test booking confirmed</span>
                  </div>
                </div>

                <div
                  className={
                    booking.sampleStatus === "TECHNICIAN ASSIGNED"
                      ? "journey-step active"
                      : "journey-step"
                  }
                >
                  <div className="journey-circle">
                    2
                  </div>

                  <div>
                    <strong>Technician Assigned</strong>
                    <span>Technician assigned for collection</span>
                  </div>
                </div>

                <div
                  className={
                    booking.sampleStatus === "SAMPLE COLLECTED"
                      ? "journey-step active"
                      : "journey-step"
                  }
                >
                  <div className="journey-circle">
                    3
                  </div>

                  <div>
                    <strong>Sample Collected</strong>
                    <span>Sample collected successfully</span>
                  </div>
                </div>

                <div
                  className={
                    booking.sampleStatus === "SAMPLE RECEIVED"
                      ? "journey-step active"
                      : "journey-step"
                  }
                >
                  <div className="journey-circle">
                    4
                  </div>

                  <div>
                    <strong>Sample Received</strong>
                    <span>Sample received at laboratory</span>
                  </div>
                </div>

                <div
                  className={
                    booking.sampleStatus === "TESTING IN PROGRESS"
                      ? "journey-step active"
                      : "journey-step"
                  }
                >
                  <div className="journey-circle">
                    5
                  </div>

                  <div>
                    <strong>Testing in Progress</strong>
                    <span>Laboratory testing is in progress</span>
                  </div>
                </div>

                <div
                  className={
                    booking.sampleStatus === "REPORT READY"
                      ? "journey-step active"
                      : "journey-step"
                  }
                >
                  <div className="journey-circle">
                    ✓
                  </div>

                  <div>
                    <strong>Report Ready</strong>
                    <span>Your laboratory report is ready</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SampleTracking;