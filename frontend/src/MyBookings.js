import React, { useEffect, useState } from "react";
import axios from "axios";

function MyBookings({ patientId, onBack }) {

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
        setError("Unable to load bookings.");
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
        <h1>My Bookings</h1>
        <p>View your laboratory test bookings</p>
      </div>

      {loading && (
        <p>Loading bookings...</p>
      )}

      {error && (
        <p className="message">{error}</p>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="message">
          No bookings found.
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
              <strong>Lab ID:</strong>{" "}
              {booking.labId}
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

            <p>
              <strong>Booking Status:</strong>{" "}
              {booking.bookingStatus}
            </p>

            <p>
              <strong>Sample Status:</strong>{" "}
              {booking.sampleStatus}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyBookings;