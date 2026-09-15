import React, { useEffect, useState } from "react";
import axios from "axios";

function SampleTracking({ patientId, onBack }) {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    axios
      .get(`http://localhost:8080/booking/patient/${patientId}`)
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
    <div className="bookings-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to Dashboard
      </button>

      <div className="bookings-header">
        <h1>Sample Tracking</h1>

        <p>
          Track your sample journey from booking to report
        </p>
      </div>

      {loading && (
        <p>Loading sample status...</p>
      )}

      {error && (
        <div className="message">
          {error}
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="message">
          No bookings available for tracking.
        </div>
      )}

      <div className="booking-list">

        {bookings.map((booking) => (

          <div
            className="booking-card"
            key={booking.bookingId}
          >

            <h2>
              Booking #{booking.bookingId}
            </h2>

            <p>
              <strong>Test ID:</strong>{" "}
              {booking.testId}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {booking.bookingDate}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {booking.bookingTime}
            </p>

            <p>
              <strong>Collection:</strong>{" "}
              {booking.collectionType}
            </p>

            <div className="tracking-status">

              <h3>Current Sample Status</h3>

              <div className="status-box">
                {booking.sampleStatus}
              </div>

            </div>

            <div className="tracking-steps">

              <div
                className={
                  booking.sampleStatus === "BOOKING CONFIRMED"
                    ? "step active"
                    : "step"
                }
              >
                ✓ Booking Confirmed
              </div>

              <div
                className={
                  booking.sampleStatus === "TECHNICIAN ASSIGNED"
                    ? "step active"
                    : "step"
                }
              >
                Technician Assigned
              </div>

              <div
                className={
                  booking.sampleStatus === "SAMPLE COLLECTED"
                    ? "step active"
                    : "step"
                }
              >
                Sample Collected
              </div>

              <div
                className={
                  booking.sampleStatus === "SAMPLE RECEIVED"
                    ? "step active"
                    : "step"
                }
              >
                Sample Received
              </div>

              <div
                className={
                  booking.sampleStatus === "TESTING IN PROGRESS"
                    ? "step active"
                    : "step"
                }
              >
                Testing in Progress
              </div>

              <div
                className={
                  booking.sampleStatus === "REPORT READY"
                    ? "step active"
                    : "step"
                }
              >
                Report Ready
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SampleTracking;