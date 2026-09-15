import React, { useState } from "react";
import axios from "axios";

function BookingForm({ selectedTest, onBack }) {

  const [bookingData, setBookingData] = useState({
    patientId: 1,
    labId: 1,
    bookingDate: "",
    bookingTime: "",
    collectionType: "LAB_VISIT"
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {

      const booking = {
        patientId: bookingData.patientId,
        labId: bookingData.labId,
        testId: selectedTest.testId,
        bookingDate: bookingData.bookingDate,
        bookingTime: bookingData.bookingTime,
        collectionType: bookingData.collectionType,
        technicianName: "",
        bookingStatus: "CONFIRMED",
        sampleStatus: "BOOKING CONFIRMED"
      };

      await axios.post(
        "http://localhost:8080/booking",
        booking
      );

      setMessage(
        "✓ Booking successful! Your test has been booked."
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Booking failed. Please try again."
      );
    }
  };

  return (
    <div className="booking-page">

      <button
        className="booking-back-button"
        onClick={onBack}
      >
        ← Back to Tests
      </button>

      <div className="booking-container">

        <div className="booking-title-section">

          <h1>Book Your Laboratory Test</h1>

          <p>
            Complete the details below to schedule your test
          </p>

        </div>


        {/* SELECTED TEST */}

        <div className="selected-test-card">

          <div className="test-icon">
            🧪
          </div>

          <div className="selected-test-content">

            <h2>
              {selectedTest.testName}
            </h2>

            <p>
              {selectedTest.description}
            </p>

            <div className="test-info-row">

              <span>
                💰 ₹{selectedTest.price}
              </span>

              <span>
                🕐 Fasting:{" "}
                {selectedTest.fastingRequired
                  ? "Required"
                  : "Not Required"}
              </span>

            </div>

          </div>

        </div>


        {/* PREPARATION */}

        <div className="preparation-card">

          <h3>
            📋 Test Preparation
          </h3>

          <p>
            {selectedTest.preparationInstructions ||
              "No special preparation required."}
          </p>

        </div>


        {/* BOOKING FORM */}

        <div className="booking-form-card">

          <h2>
            Appointment Details
          </h2>

          <p className="booking-form-subtitle">
            Select your preferred date, time and
            sample collection method.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="booking-field">

              <label>
                📅 Booking Date
              </label>

              <input
                type="date"
                value={bookingData.bookingDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    bookingDate: e.target.value
                  })
                }
                required
              />

            </div>


            <div className="booking-field">

              <label>
                🕐 Preferred Time
              </label>

              <input
                type="time"
                value={bookingData.bookingTime}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    bookingTime: e.target.value
                  })
                }
                required
              />

            </div>


            <div className="booking-field">

              <label>
                📍 Sample Collection Method
              </label>

              <div className="collection-options">

                <label className="collection-option">

                  <input
                    type="radio"
                    name="collectionType"
                    value="LAB_VISIT"
                    checked={
                      bookingData.collectionType === "LAB_VISIT"
                    }
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        collectionType: e.target.value
                      })
                    }
                  />

                  <div>
                    <strong>Lab Visit</strong>
                    <small>
                      Visit the laboratory for your test
                    </small>
                  </div>

                </label>


                <label className="collection-option">

                  <input
                    type="radio"
                    name="collectionType"
                    value="HOME_COLLECTION"
                    checked={
                      bookingData.collectionType ===
                      "HOME_COLLECTION"
                    }
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        collectionType: e.target.value
                      })
                    }
                  />

                  <div>
                    <strong>Home Collection</strong>
                    <small>
                      Technician collects sample from home
                    </small>
                  </div>

                </label>

              </div>

            </div>


            <button
              type="submit"
              className="confirm-booking-button"
            >
              Confirm Booking
            </button>

          </form>


          {message && (

            <div
              className={
                message.startsWith("✓")
                  ? "booking-success"
                  : "booking-error"
              }
            >
              {message}
            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default BookingForm;