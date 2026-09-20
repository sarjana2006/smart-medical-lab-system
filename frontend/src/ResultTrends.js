import React, { useEffect, useState } from "react";
import axios from "axios";

function ResultTrends({ reportId, onBack }) {

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    axios
      .get(`https://smart-medical-lab-backend.onrender.com/test-result/report/${reportId}`)
      .then((response) => {
        setResults(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load test results.");
        setLoading(false);
      });

  }, [reportId]);

  return (
    <div className="bookings-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to Dashboard
      </button>

      <div className="bookings-header">

        <h1>Result Trends</h1>

        <p>
          View your laboratory test results and trends
        </p>

      </div>

      {loading && (
        <p>Loading results...</p>
      )}

      {error && (
        <div className="message">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        results.length === 0 && (
          <div className="message">
            No test results available.
          </div>
        )}

      <div className="booking-list">

        {results.map((result) => (

          <div
            className="booking-card"
            key={result.resultId}
          >

            <h2>
              {result.parameterName}
            </h2>

            <p>
              <strong>Result:</strong>{" "}
              {result.resultValue} {result.unit}
            </p>

            <p>
              <strong>Reference Range:</strong>{" "}
              {result.referenceRange}
            </p>

            <p>
              <strong>Trend:</strong>{" "}
              {result.trend}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {result.criticalStatus}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ResultTrends;