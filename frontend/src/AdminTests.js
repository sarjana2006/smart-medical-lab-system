import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminTests({ onBack }) {

  const [tests, setTests] = useState([]);

  const [formData, setFormData] = useState({
    testName: "",
    description: "",
    preparationInstructions: "",
    price: "",
    fastingRequired: false,
    available: true
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // Load all tests
  const loadTests = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/tests/all"
      );

      setTests(response.data);

    } catch (error) {

      console.error(error);
      setMessage("Failed to load tests.");

    }
  };

  useEffect(() => {
    loadTests();
  }, []);

  // Input change
  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // Add / Update
  const handleSubmit = async (e) => {

    e.preventDefault();
    setMessage("");

    try {

      const data = {
        ...formData,
        price: Number(formData.price)
      };

      if (editingId) {

        await axios.put(
          `http://localhost:8080/tests/${editingId}`,
          data
        );

        setMessage("Test updated successfully.");

      } else {

        await axios.post(
          "http://localhost:8080/tests",
          data
        );

        setMessage("Test added successfully.");
      }

      setFormData({
        testName: "",
        description: "",
        preparationInstructions: "",
        price: "",
        fastingRequired: false,
        available: true
      });

      setEditingId(null);

      loadTests();

    } catch (error) {

      console.error(error);
      setMessage("Operation failed.");

    }
  };

  // Edit
  const handleEdit = (test) => {

    setEditingId(test.testId);

    setFormData({
      testName: test.testName || "",
      description: test.description || "",
      preparationInstructions:
        test.preparationInstructions || "",
      price: test.price || "",
      fastingRequired: test.fastingRequired,
      available: test.available
    });

    setMessage("");
  };

  // Delete
  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this test?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:8080/tests/${id}`
      );

      setMessage("Test deleted successfully.");

      loadTests();

    } catch (error) {

      console.error(error);
      setMessage("Failed to delete test.");

    }
  };

  // Cancel edit
  const handleCancel = () => {

    setEditingId(null);

    setFormData({
      testName: "",
      description: "",
      preparationInstructions: "",
      price: "",
      fastingRequired: false,
      available: true
    });

    setMessage("");
  };

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">

        <div>
          <h1>Manage Laboratory Tests</h1>
          <p>Admin Test Management</p>
        </div>

        <button
          className="logout-button"
          onClick={onBack}
        >
          ← Back
        </button>

      </div>

      <div className="welcome-box">

        <h2>
          {editingId
            ? "Update Laboratory Test"
            : "Add New Laboratory Test"}
        </h2>

        <p>
          Add, update and manage available laboratory tests.
        </p>

      </div>

      <div className="form-section">

        <form onSubmit={handleSubmit}>

          <label>Test Name</label>

          <input
            type="text"
            name="testName"
            placeholder="Enter test name"
            value={formData.testName}
            onChange={handleChange}
            required
          />

          <label>Description</label>

          <textarea
            name="description"
            placeholder="Enter test description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Preparation Instructions</label>

          <textarea
            name="preparationInstructions"
            placeholder="Enter preparation instructions"
            value={formData.preparationInstructions}
            onChange={handleChange}
            required
          />

          <label>Price</label>

          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
          />

          <div style={{ marginTop: "15px" }}>

            <label>
              <input
                type="checkbox"
                name="fastingRequired"
                checked={formData.fastingRequired}
                onChange={handleChange}
              />

              {" "}Fasting Required
            </label>

          </div>

          <div style={{ marginTop: "10px" }}>

            <label>
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
              />

              {" "}Available
            </label>

          </div>

          <div style={{ marginTop: "20px" }}>

            <button
              type="submit"
              className="main-button"
            >
              {editingId
                ? "Update Test"
                : "Add Test"}
            </button>

            {editingId && (

              <button
                type="button"
                className="link-button"
                onClick={handleCancel}
              >
                Cancel
              </button>

            )}

          </div>

        </form>

        {message && (

          <div className="message">
            {message}
          </div>

        )}

      </div>

      <div className="welcome-box">

        <h2>Existing Tests</h2>

      </div>

      <div className="dashboard-grid">

        {tests.map((test) => (

          <div
            className="dashboard-card"
            key={test.testId}
          >

            <h3>
              {test.testName}
            </h3>

            <p>
              {test.description}
            </p>

            <p>
              <strong>
                Price:
              </strong>{" "}
              ₹{test.price}
            </p>

            <p>
              <strong>
                Fasting:
              </strong>{" "}
              {test.fastingRequired
                ? "Required"
                : "Not Required"}
            </p>

            <p>
              <strong>
                Status:
              </strong>{" "}
              {test.available
                ? "Available"
                : "Unavailable"}
            </p>

            <button
              onClick={() => handleEdit(test)}
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(test.testId)
              }
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminTests;