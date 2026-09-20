import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

function AdminPatients({ onBack }) {
  const [patients, setPatients] = useState([]);
  const [message, setMessage] = useState("");
  const [editingPatient, setEditingPatient] = useState(null);

  const token = localStorage.getItem("token");

  const authConfig = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
    [token]
  );

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
  }, [authConfig]);

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
    if (!editingPatient) {
      return;
    }

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
          <h2 style={styles.title}>Manage Patients</h2>
          <p style={styles.subtitle}>
            View and manage registered patients
          </p>
        </div>

        <button style={styles.backButton} onClick={onBack}>
          ← Back
        </button>
      </div>

      {message && (
        <div style={styles.message}>
          {message}
        </div>
      )}

      {editingPatient && (
        <div style={styles.editBox}>
          <h3>Edit Patient</h3>

          <input
            type="text"
            name="name"
            value={editingPatient.name || ""}
            onChange={handleChange}
            placeholder="Patient Name"
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            value={editingPatient.email || ""}
            onChange={handleChange}
            placeholder="Email"
            style={styles.input}
          />

          <input
            type="text"
            name="phone"
            value={editingPatient.phone || ""}
            onChange={handleChange}
            placeholder="Phone"
            style={styles.input}
          />

          <div style={styles.editButtons}>
            <button
              style={styles.saveButton}
              onClick={updatePatient}
            >
              Save
            </button>

            <button
              style={styles.cancelButton}
              onClick={() => setEditingPatient(null)}
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
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr key={patient.patientId}>
                  <td style={styles.td}>{patient.patientId}</td>
                  <td style={styles.td}>{patient.name}</td>
                  <td style={styles.td}>{patient.email}</td>
                  <td style={styles.td}>{patient.phone}</td>
                  <td style={styles.td}>{patient.role}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.editButton}
                      onClick={() => startEdit(patient)}
                    >
                      Edit
                    </button>

                    <button
                      style={styles.deleteButton}
                      onClick={() =>
                        deletePatient(patient.patientId)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={styles.empty}>
                  No patients found
                </td>
              </tr>
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
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px"
  },

  title: {
    margin: 0,
    fontSize: "28px",
    color: "#1f2937"
  },

  subtitle: {
    marginTop: "8px",
    color: "#6b7280"
  },

  backButton: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#374151",
    color: "white",
    cursor: "pointer",
    fontSize: "14px"
  },

  message: {
    padding: "12px",
    marginBottom: "20px",
    backgroundColor: "#ecfdf5",
    color: "#065f46",
    borderRadius: "8px"
  },

  editBox: {
    padding: "20px",
    marginBottom: "25px",
    backgroundColor: "#f9fafb",
    borderRadius: "10px",
    border: "1px solid #e5e7eb"
  },

  input: {
    width: "100%",
    padding: "11px",
    marginTop: "10px",
    marginBottom: "8px",
    boxSizing: "border-box",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px"
  },

  editButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "12px"
  },

  saveButton: {
    padding: "9px 18px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#16a34a",
    color: "white",
    cursor: "pointer"
  },

  cancelButton: {
    padding: "9px 18px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#6b7280",
    color: "white",
    cursor: "pointer"
  },

  tableWrapper: {
    overflowX: "auto",
    borderRadius: "10px",
    border: "1px solid #e5e7eb"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white"
  },

  th: {
    padding: "14px",
    textAlign: "left",
    backgroundColor: "#f3f4f6",
    color: "#374151",
    borderBottom: "1px solid #d1d5db"
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #e5e7eb",
    color: "#374151"
  },

  editButton: {
    padding: "7px 12px",
    marginRight: "8px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer"
  },

  deleteButton: {
    padding: "7px 12px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#dc2626",
    color: "white",
    cursor: "pointer"
  },

  empty: {
    padding: "25px",
    textAlign: "center",
    color: "#6b7280"
  }
};

export default AdminPatients;