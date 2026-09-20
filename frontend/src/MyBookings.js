import React, { useEffect, useState } from "react";
import axios from "axios";

function MyBookings({ patientId, onBack }) {

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
        setError("Unable to load bookings.");
        setLoading(false);
      });

  }, [patientId]);

  return (
    <div className="bookings-page">

      {/* TOP BAR */}

      <div className="page-topbar">

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Dashboard
        </button>

        <div className="page-title">

          <h1>My Bookings</h1>

          <p>
            Manage your laboratory test appointments
          </p>

        </div>

      </div>


      {/* LOADING */}

      {loading && (

        <div className="status-box">

          <div className="loading-icon">
            ⟳
          </div>

          <h3>Loading your bookings...</h3>

          <p>Please wait a moment.</p>

        </div>

      )}


      {/* ERROR */}

      {error && (

        <div className="status-box error-box">

          <div className="status-icon">
            !
          </div>

          <h3>Unable to load bookings</h3>

          <p>{error}</p>

        </div>

      )}


      {/* NO BOOKINGS */}

      {!loading && !error && bookings.length === 0 && (

        <div className="status-box">

          <div className="empty-icon">
            □
          </div>

          <h3>No Bookings Found</h3>

          <p>
            You haven't booked any laboratory tests yet.
          </p>

        </div>

      )}


      {/* BOOKING CARDS */}

      {!loading && !error && bookings.length > 0 && (

        <div className="booking-list">

          {bookings.map((booking) => (

            <div
              className="booking-card"
              key={booking.bookingId}
            >

              {/* CARD HEADER */}

              <div className="booking-card-header">

                <div>

                  <span className="booking-label">
                    BOOKING ID
                  </span>

                  <h2>
                    #{booking.bookingId}
                  </h2>

                </div>

                <span className="booking-status">
                  {booking.bookingStatus}
                </span>

              </div>


              {/* TEST INFORMATION */}

              <div className="booking-section">

                <h3>
                  🧪 Test Information
                </h3>

                <div className="booking-details">

                  <div className="detail-item">

                    <span>
                      Test ID
                    </span>

                    <strong>
                      {booking.testId}
                    </strong>

                  </div>

                  <div className="detail-item">

                    <span>
                      Lab ID
                    </span>

                    <strong>
                      {booking.labId}
                    </strong>

                  </div>

                </div>

              </div>


              {/* APPOINTMENT */}

              <div className="booking-section">

                <h3>
                  📅 Appointment
                </h3>

                <div className="booking-details">

                  <div className="detail-item">

                    <span>
                      Date
                    </span>

                    <strong>
                      {booking.bookingDate}
                    </strong>

                  </div>

                  <div className="detail-item">

                    <span>
                      Time
                    </span>

                    <strong>
                      {booking.bookingTime}
                    </strong>

                  </div>

                </div>

              </div>


              {/* COLLECTION */}

              <div className="booking-section">

                <h3>
                  🏠 Sample Collection
                </h3>

                <div className="collection-row">

                  <span className="collection-type">
                    {booking.collectionType}
                  </span>

                  <div>

                    <span className="sample-label">
                      Sample Status
                    </span>

                    <strong className="sample-status">
                      {booking.sampleStatus}
                    </strong>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyBookings;