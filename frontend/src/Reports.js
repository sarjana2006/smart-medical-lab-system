import React, { useEffect, useState } from "react";
import axios from "axios";

function Reports({ patientId, onBack }) {

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    axios
      .get(`http://localhost:8080/report/patient/${patientId}`)
      .then((response) => {

        setReports(response.data);
        setLoading(false);

      })
      .catch((error) => {

        console.error(error);

        setError("Unable to load reports.");
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

        <h1>
          My Reports
        </h1>

        <p>
          View your digital laboratory reports
        </p>

      </div>


      {loading && (
        <p>Loading reports...</p>
      )}


      {error && (
        <div className="message">
          {error}
        </div>
      )}


      {!loading &&
        !error &&
        reports.length === 0 && (

          <div className="message">
            No reports available.
          </div>

        )}


      <div className="booking-list">

        {reports.map((report) => (

          <div
            className="booking-card"
            key={report.reportId}
          >

            <h2>
              Laboratory Report
            </h2>

            <p>
              <strong>Report ID:</strong>{" "}
              {report.reportId}
            </p>

            <p>
              <strong>Booking ID:</strong>{" "}
              {report.bookingId}
            </p>

            <p>
              <strong>Report File:</strong>{" "}
              {report.reportFile}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {report.reportStatus}
            </p>

            <p>
              <strong>Report Date:</strong>{" "}
              {report.reportDate}
            </p>

            <p>
              <strong>Created At:</strong>{" "}
              {report.createdAt}
            </p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Reports;