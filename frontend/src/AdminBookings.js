import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminBookings({ onBack }) {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  const [editingBooking, setEditingBooking] = useState(null);

  // Load all bookings
  const loadBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/booking"
      );

      setBookings(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load bookings");
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // Delete booking
  const deleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/booking/${bookingId}`
      );

      setMessage("Booking deleted successfully");
      loadBookings();
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete booking");
    }
  };

  // Start editing
  const startEdit = (booking) => {
    setEditingBooking({ ...booking });
    setMessage("");
  };

  // Handle edit changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setEditingBooking({
      ...editingBooking,
      [name]: value
    });
  };

  // Update booking
  const updateBooking = async () => {
    try {
      await axios.put(
        `http://localhost:8080/booking/${editingBooking.bookingId}`,
        {
          ...editingBooking,
          patientId: Number(editingBooking.patientId),
          labId: Number(editingBooking.labId),
          testId: Number(editingBooking.testId)
        }
      );

      setMessage("Booking updated successfully");
      setEditingBooking(null);
      loadBookings();
    } catch (error) {
      console.error(error);
      setMessage("Failed to update booking");
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Manage Bookings</h2>
          <p style={styles.subtitle}>
            View, update and manage patient bookings
          </p>
        </div>

        <button
          onClick={onBack}
          style={styles.backButton}
        >
          ← Back to Dashboard
        </button>
      </div>

      {message && (
        <div style={styles.message}>
          {message}
        </div>
      )}

      {/* EDIT BOOKING */}
      {editingBooking && (
        <div style={styles.editBox}>

          <h3 style={styles.editTitle}>
            Edit Booking #{editingBooking.bookingId}
          </h3>

          <div style={styles.formGrid}>

            <div>
              <label style={styles.label}>Patient ID</label>
              <input
                style={styles.input}
                name="patientId"
                value={editingBooking.patientId}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={styles.label}>Lab ID</label>
              <input
                style={styles.input}
                name="labId"
                value={editingBooking.labId}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={styles.label}>Test ID</label>
              <input
                style={styles.input}
                name="testId"
                value={editingBooking.testId}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={styles.label}>Booking Date</label>
              <input
                type="date"
                style={styles.input}
                name="bookingDate"
                value={editingBooking.bookingDate || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={styles.label}>Booking Time</label>
              <input
                type="time"
                style={styles.input}
                name="bookingTime"
                value={editingBooking.bookingTime || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={styles.label}>Collection Type</label>
              <input
                style={styles.input}
                name="collectionType"
                value={editingBooking.collectionType || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={styles.label}>Technician</label>
              <input
                style={styles.input}
                name="technicianName"
                value={editingBooking.technicianName || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={styles.label}>Booking Status</label>
              <input
                style={styles.input}
                name="bookingStatus"
                value={editingBooking.bookingStatus || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={styles.label}>Sample Status</label>
              <input
                style={styles.input}
                name="sampleStatus"
                value={editingBooking.sampleStatus || ""}
                onChange={handleChange}
              />
            </div>

          </div>

          <div style={styles.editActions}>

            <button
              onClick={updateBooking}
              style={styles.updateButton}
            >
              Update Booking
            </button>

            <button
              onClick={() => setEditingBooking(null)}
              style={styles.cancelButton}
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      {/* BOOKINGS TABLE */}
      <div style={styles.tableWrapper}>

        <table style={styles.table}>

          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Patient</th>
              <th style={styles.th}>Lab</th>
              <th style={styles.th}>Test</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Collection</th>
              <th style={styles.th}>Technician</th>
              <th style={styles.th}>Booking Status</th>
              <th style={styles.th}>Sample Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>

            {bookings.length === 0 ? (

              <tr>
                <td
                  colSpan="11"
                  style={styles.empty}
                >
                  No bookings found
                </td>
              </tr>

            ) : (

              bookings.map((booking) => (

                <tr key={booking.bookingId}>

                  <td style={styles.td}>
                    {booking.bookingId}
                  </td>

                  <td style={styles.td}>
                    {booking.patientId}
                  </td>

                  <td style={styles.td}>
                    {booking.labId}
                  </td>

                  <td style={styles.td}>
                    {booking.testId}
                  </td>

                  <td style={styles.td}>
                    {booking.bookingDate}
                  </td>

                  <td style={styles.td}>
                    {booking.bookingTime}
                  </td>

                  <td style={styles.td}>
                    {booking.collectionType}
                  </td>

                  <td style={styles.td}>
                    {booking.technicianName || "-"}
                  </td>

                  <td style={styles.td}>
                    <span style={styles.status}>
                      {booking.bookingStatus}
                    </span>
                  </td>

                  <td style={styles.td}>
                    {booking.sampleStatus}
                  </td>

                  <td style={styles.actionTd}>

                    <button
                      onClick={() => startEdit(booking)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteBooking(booking.bookingId)
                      }
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

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

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  title: {
    margin: "0",
    fontSize: "28px"
  },

  subtitle: {
    marginTop: "6px",
    color: "#666"
  },

  backButton: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#555",
    color: "white"
  },

  message: {
    padding: "12px",
    marginBottom: "20px",
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    borderRadius: "6px",
    fontWeight: "bold"
  },

  editBox: {
    backgroundColor: "white",
    padding: "22px",
    marginBottom: "25px",
    borderRadius: "10px",
    border: "1px solid #ddd"
  },

  editTitle: {
    marginTop: "0",
    marginBottom: "20px"
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px"
  },

  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold"
  },

  input: {
    width: "100%",
    padding: "9px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },

  editActions: {
    marginTop: "20px"
  },

  updateButton: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#1976d2",
    color: "white"
  },

  cancelButton: {
    padding: "10px 18px",
    marginLeft: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#777",
    color: "white"
  },

  tableWrapper: {
    backgroundColor: "white",
    borderRadius: "10px",
    overflowX: "auto",
    border: "1px solid #ddd"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "1200px"
  },

  th: {
    padding: "14px 12px",
    borderBottom: "2px solid #ddd",
    textAlign: "left",
    whiteSpace: "nowrap",
    backgroundColor: "#f0f2f5"
  },

  td: {
    padding: "13px 12px",
    borderBottom: "1px solid #eee",
    whiteSpace: "nowrap"
  },

  actionTd: {
    padding: "13px 12px",
    borderBottom: "1px solid #eee",
    whiteSpace: "nowrap"
  },

  editButton: {
    padding: "7px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#1976d2",
    color: "white"
  },

  deleteButton: {
    padding: "7px 12px",
    marginLeft: "8px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#d32f2f",
    color: "white"
  },

  status: {
    fontWeight: "bold"
  },

  empty: {
    padding: "30px",
    textAlign: "center",
    color: "#777"
  }
};

export default AdminBookings;