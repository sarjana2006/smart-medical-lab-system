import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminReports({ onBack }) {

  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState("");

  const [newReport, setNewReport] = useState({
    bookingId: "",
    reportDate: "",
    reportFile: "",
    reportStatus: "AVAILABLE"
  });

  const [editingReport, setEditingReport] = useState(null);

  // JWT Token
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    };
  };

  // Load all reports
  const loadReports = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/report",
        getAuthConfig()
      );

      setReports(response.data);

    } catch (error) {

      console.error(error);
      setMessage("Failed to load reports");
    }
  };

  useEffect(() => {
    loadReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Add Report
  const addReport = async () => {

    try {

      await axios.post(
        "http://localhost:8080/report",
        {
          bookingId: Number(newReport.bookingId),

          reportDate: newReport.reportDate
            ? newReport.reportDate + ":00"
            : null,

          reportFile: newReport.reportFile,
          reportStatus: newReport.reportStatus
        },
        getAuthConfig()
      );

      setMessage("Report added successfully");

      setNewReport({
        bookingId: "",
        reportDate: "",
        reportFile: "",
        reportStatus: "AVAILABLE"
      });

      loadReports();

    } catch (error) {

      console.error(error);
      setMessage("Failed to add report");
    }
  };

  // Start Edit
  const startEdit = (report) => {

    setEditingReport({
      ...report,

      reportDate: report.reportDate
        ? report.reportDate.substring(0, 16)
        : ""
    });

    setMessage("");
  };

  // Update Report
  const updateReport = async () => {

    try {

      await axios.put(
        `http://localhost:8080/report/${editingReport.reportId}`,
        {
          bookingId: Number(editingReport.bookingId),

          reportDate: editingReport.reportDate
            ? editingReport.reportDate + ":00"
            : null,

          reportFile: editingReport.reportFile,
          reportStatus: editingReport.reportStatus
        },
        getAuthConfig()
      );

      setEditingReport(null);

      setMessage("Report updated successfully");

      loadReports();

    } catch (error) {

      console.error(error);
      setMessage("Failed to update report");
    }
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>
        Admin - Manage Reports
      </h1>

      <button
        onClick={onBack}
        style={styles.backButton}
      >
        ← Back to Dashboard
      </button>

      {message && (
        <p style={styles.message}>
          {message}
        </p>
      )}

      {/* ADD REPORT */}

      <div style={styles.card}>

        <h2>Add New Report</h2>

        <input
          type="number"
          placeholder="Booking ID"
          value={newReport.bookingId}
          onChange={(e) =>
            setNewReport({
              ...newReport,
              bookingId: e.target.value
            })
          }
          style={styles.input}
        />

        <input
          type="datetime-local"
          value={newReport.reportDate}
          onChange={(e) =>
            setNewReport({
              ...newReport,
              reportDate: e.target.value
            })
          }
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Report File"
          value={newReport.reportFile}
          onChange={(e) =>
            setNewReport({
              ...newReport,
              reportFile: e.target.value
            })
          }
          style={styles.input}
        />

        <select
          value={newReport.reportStatus}
          onChange={(e) =>
            setNewReport({
              ...newReport,
              reportStatus: e.target.value
            })
          }
          style={styles.input}
        >

          <option value="AVAILABLE">
            AVAILABLE
          </option>

          <option value="PENDING">
            PENDING
          </option>

        </select>

        <button
          onClick={addReport}
          style={styles.addButton}
        >
          Add Report
        </button>

      </div>

      {/* EDIT REPORT */}

      {editingReport && (

        <div style={styles.card}>

          <h2>Edit Report</h2>

          <input
            type="number"
            placeholder="Booking ID"
            value={editingReport.bookingId}
            onChange={(e) =>
              setEditingReport({
                ...editingReport,
                bookingId: e.target.value
              })
            }
            style={styles.input}
          />

          <input
            type="datetime-local"
            value={editingReport.reportDate}
            onChange={(e) =>
              setEditingReport({
                ...editingReport,
                reportDate: e.target.value
              })
            }
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Report File"
            value={editingReport.reportFile || ""}
            onChange={(e) =>
              setEditingReport({
                ...editingReport,
                reportFile: e.target.value
              })
            }
            style={styles.input}
          />

          <select
            value={editingReport.reportStatus || ""}
            onChange={(e) =>
              setEditingReport({
                ...editingReport,
                reportStatus: e.target.value
              })
            }
            style={styles.input}
          >

            <option value="AVAILABLE">
              AVAILABLE
            </option>

            <option value="PENDING">
              PENDING
            </option>

          </select>

          <button
            onClick={updateReport}
            style={styles.updateButton}
          >
            Update Report
          </button>

          <button
            onClick={() => {
              setEditingReport(null);
              setMessage("");
            }}
            style={styles.cancelButton}
          >
            Cancel
          </button>

        </div>

      )}

      {/* REPORT LIST */}

      <div style={styles.card}>

        <h2>All Reports</h2>

        {reports.length === 0 ? (

          <p>No reports found.</p>

        ) : (

          <table style={styles.table}>

            <thead>

              <tr>

                <th style={styles.th}>
                  Report ID
                </th>

                <th style={styles.th}>
                  Booking ID
                </th>

                <th style={styles.th}>
                  Report Date
                </th>

                <th style={styles.th}>
                  Report File
                </th>

                <th style={styles.th}>
                  Status
                </th>

                <th style={styles.th}>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {reports.map((report) => (

                <tr key={report.reportId}>

                  <td style={styles.td}>
                    {report.reportId}
                  </td>

                  <td style={styles.td}>
                    {report.bookingId}
                  </td>

                  <td style={styles.td}>
                    {report.reportDate
                      ? new Date(
                          report.reportDate
                        ).toLocaleString()
                      : "-"}
                  </td>

                  <td style={styles.td}>
                    {report.reportFile || "-"}
                  </td>

                  <td style={styles.td}>
                    {report.reportStatus || "-"}
                  </td>

                  <td style={styles.td}>

                    <button
                      onClick={() => startEdit(report)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

const styles = {

  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f7fb",
    minHeight: "100vh"
  },

  title: {
    textAlign: "center",
    marginBottom: "20px"
  },

  backButton: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px"
  },

  message: {
    padding: "12px",
    backgroundColor: "#d4edda",
    color: "#155724",
    borderRadius: "6px",
    textAlign: "center",
    fontWeight: "bold"
  },

  card: {
    backgroundColor: "white",
    padding: "20px",
    marginBottom: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflowX: "auto"
  },

  input: {
    padding: "10px",
    margin: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },

  addButton: {
    padding: "10px 18px",
    margin: "5px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  updateButton: {
    padding: "10px 18px",
    margin: "5px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  cancelButton: {
    padding: "10px 18px",
    margin: "5px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  editButton: {
    padding: "7px 14px",
    backgroundColor: "#ffc107",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  th: {
    border: "1px solid #ddd",
    padding: "12px",
    backgroundColor: "#f1f1f1"
  },

  td: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "center"
  }
};

export default AdminReports;