import React, { useEffect, useState } from "react";
import axios from "axios";

function FollowUps({ patientId, onBack }) {
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    axios
      .get(`https://smart-medical-lab-backend.onrender.com/followups/patient/${patientId}`)
      .then((response) => {
        setFollowUps(response.data);
      })
      .catch((error) => {
        console.error("Error fetching follow-ups:", error);
      });
  }, [patientId]);

  return (
    <div className="followup-container">

      <div className="followup-header">
        <div>
          <h1>Follow-up Management</h1>
          <p>View your recommended follow-up tests and reminders</p>
        </div>

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>
      </div>

      {followUps.length === 0 ? (

        <div className="followup-empty">
          <h2>No Follow-ups Available</h2>
          <p>You currently have no recommended follow-up tests.</p>
        </div>

      ) : (

        <div className="followup-grid">

          {followUps.map((followUp) => (

            <div
              className="followup-card"
              key={followUp.followupId}
            >

              <div className="followup-card-header">
                <h2>Follow-up #{followUp.followupId}</h2>

                <span className="followup-status">
                  {followUp.status}
                </span>
              </div>

              <div className="followup-details">

                <p>
                  <strong>Report ID:</strong>{" "}
                  {followUp.reportId}
                </p>

                <p>
                  <strong>Recommended Test:</strong>{" "}
                  Test ID {followUp.recommendedTestId}
                </p>

                <p>
                  <strong>Reminder Date:</strong>{" "}
                  {followUp.reminderDate}
                </p>

                <p>
                  <strong>Follow-up Date:</strong>{" "}
                  {followUp.followupDate}
                </p>

                <div className="followup-notes">
                  <strong>Notes</strong>
                  <p>{followUp.notes}</p>
                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default FollowUps;