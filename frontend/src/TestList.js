import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingForm from "./BookingForm";

function TestList({ onBack }) {

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTest, setSelectedTest] = useState(null);

  // Load tests from backend
  useEffect(() => {

    axios
      .get("http://localhost:8080/tests")

      .then((response) => {
        setTests(response.data);
        setLoading(false);
      })

      .catch((error) => {
        console.error(error);
        setError("Unable to load laboratory tests.");
        setLoading(false);
      });

  }, []);

  // Booking page
  if (selectedTest) {

    return (
      <BookingForm
        selectedTest={selectedTest}
        onBack={() => setSelectedTest(null)}
        onSuccess={() => setSelectedTest(null)}
      />
    );

  }

  // Loading
  if (loading) {
    return (
      <div className="test-page">
        <h2>Loading laboratory tests...</h2>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="test-page">
        <h2>{error}</h2>

        <button
          className="back-button"
          onClick={onBack}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (

    <div className="test-page">

      {/* Back to Dashboard */}
      <button
        className="back-button"
        onClick={onBack}
      >
        Back to Dashboard
      </button>

      {/* Page Header */}
      <div className="test-page-header">

        <h1>Smart Medical Lab</h1>

        <h2>Available Laboratory Tests</h2>

        <p>
          Select a test to view preparation details and book an appointment.
        </p>

      </div>

      {/* Test Cards */}
      <div className="test-list-container">

        {tests.map((test) => (

          <div
            className="test-card"
            key={test.testId}
          >

            <h2>{test.testName}</h2>

            <p>
              {test.description}
            </p>

            <p>
              <strong>Preparation:</strong>{" "}
              {test.preparationInstructions}
            </p>

            <p>
              <strong>Price:</strong> ₹{test.price}
            </p>

            <p>
              <strong>Fasting:</strong>{" "}
              {test.fastingRequired
                ? "Required"
                : "Not Required"}
            </p>

            <button
              className="book-test-button"
              onClick={() => setSelectedTest(test)}
            >
              Book Test
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TestList;