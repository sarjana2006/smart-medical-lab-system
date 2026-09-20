import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

function AdminPatients({ onBack }) {
  const [patients, setPatients] = useState([]);
  const [message, setMessage] = useState("");
  const [editingPatient, setEditingPatient] = useState(null);

  const token = localStorage.getItem("token");

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const loadPatients = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://smart-medical-lab-backend.onrender.com/patient",
        authConfig
      );

      setPatients(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load patients");
    }
  }, [token]);

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  const startEdit = (patient) => {
    setEditingPatient({ ...patient });
    setMessage("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setEditingPatient({
      ...editingPatient,
      [name]: value
    });
  };

  const updatePatient = async () => {
    try {
      await axios.put(
        `https://smart-medical-lab-backend.onrender.com/patient/${editingPatient.patientId}`,
        {
          name: editingPatient.name,
          email: editingPatient.email,
          phone: editingPatient.phone
        },
        authConfig
      );

      setMessage("Patient updated successfully");
      setEditingPatient(null);
      loadPatients();
    } catch (error) {
      console.error(error);
      setMessage("Failed to update patient");
    }
  };

  const deletePatient = async (patientId) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) {
      return;
    }

    try {
      await axios.delete(
        `https://smart-medical-lab-backend.onrender.com/patient/${patientId}`,
        authConfig
      );

      setMessage("Patient deleted successfully");
      loadPatients();
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete patient");
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Patient Management</h2>

          <p style={styles.subtitle}>
            View, update and manage registered patients
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

      {editingPatient && (
        <div style={styles.editBox}>

          <h3 style={styles.sectionTitle}>
            Edit Patient #{editingPatient.patientId}
          </h3>

          <div style={styles.formGrid}>

            <div>
              <label style={styles.label}>Name</label>

              <input
                type="text"
                name="name"
                value={editingPatient.name || ""}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Email</label>

              <input
                type="email"
                name="email"
                value={editingPatient.email || ""}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Phone</label>

              <input
                type="text"
                name="phone"
                value={editingPatient.phone || ""}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

          </div>

          <div style={styles.actions}>

            <button
              onClick={updatePatient}
              style={styles.updateButton}
            >
              Update Patient
            </button>

            <button
              onClick={() => setEditingPatient(null)}
              style={styles.cancelButton}
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      <div style={styles.tableWrapper}>

        <table style={styles.table}>

          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Created At</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>

            {patients.length === 0 ? (

              <tr>
                <td
                  colSpan="7"
                  style={styles.empty}
                >
                  No patients found
                </td>
              </tr>

            ) : (

              patients.map((patient) => (

                <tr key={patient.patientId}>

                  <td style={styles.td}>
                    {patient.patientId}
                  </td>

                  <td style={styles.td}>
                    {patient.name}
                  </td>

                  <td style={styles.td}>
                    {patient.email}
                  </td>

                  <td style={styles.td}>
                    {patient.phone}
                  </td>

                  <td style={styles.td}>
                    {patient.role}
                  </td>

                  <td style={styles.td}>
                    {patient.createdAt}
                  </td>

                  <td style={styles.actionTd}>

                    <button
                      onClick={() => startEdit(patient)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deletePatient(patient.patientId)
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

  sectionTitle: {
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

  actions: {
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
    minWidth: "1000px"
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

  empty: {
    padding: "30px",
    textAlign: "center",
    color: "#777"
  }
};

export default AdminPatients;