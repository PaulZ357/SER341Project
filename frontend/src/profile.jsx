import React, { useState } from "react";
import {  Link } from "react-router-dom";
import "./profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    major: "",
    courses: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!password) return "Password is required";
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters, include a number, special character, uppercase, and lowercase letter";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    // Password validation
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Role-specific validation
    if (user.type === "student" && !formData.major.trim()) {
      newErrors.major = "Major is required";
    }
    if (user.type === "professor" && !formData.courses.trim()) {
      newErrors.courses = "Courses taught are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    const newErrors = { ...errors };

    if (name === "password") {
      const passwordError = validatePassword(value);
      if (!passwordError) {
        delete newErrors.password;
      } else {
        newErrors.password = passwordError;
      }
    }

    if (name === "confirmPassword" && value === formData.password) {
      delete newErrors.confirmPassword;
    }

    if (name === "major" && value.trim()) {
      delete newErrors.major;
    }

    if (name === "courses" && value.trim()) {
      delete newErrors.courses;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSuccessMessage("Profile saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      // Optionally send data to backend here
    }
  };

  return (
    <div className="app-container">
      <div className="left-sidebar">
        <nav>
          <Link
            to="/selectcourse"
            className="btn btn-secondary"
          >
            Course Selection
          </Link>
          <Link to="/" className="btn btn-secondary">
            Log Out
          </Link>
        </nav>
      </div>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src="https://via.placeholder.com/80" alt="Avatar" />
          </div>
          <div className="profile-info">
            <p>
              <strong>
                {user.name}
              </strong>
            </p>
          </div>
          <button className="edit-button">Edit</button>
        </div>
        <div className="line"></div>

        <form onSubmit={handleSubmit}>
          {user.type === "student" && (
            <>
              <div className="profile-section">
                <label htmlFor="major">Major:</label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  placeholder="Enter your major"
                  className="profile-input"
                  value={formData.major}
                  onChange={handleInputChange}
                />
                {errors.major && <p className="error-text">{errors.major}</p>}
              </div>
              <div className="profile-section">
                <label htmlFor="additional-info">Additional Information:</label>
                <textarea
                  id="additional-info"
                  name="additional-info"
                  placeholder="Enter additional information"
                  className="profile-textarea"
                />
              </div>
            </>
          )}

          {user.type === "professor" && (
            <>
              <div className="profile-section">
                <label htmlFor="courses">Courses Taught:</label>
                <input
                  type="text"
                  id="courses"
                  name="courses"
                  placeholder="Enter courses you teach"
                  className="profile-input"
                  value={formData.courses}
                  onChange={handleInputChange}
                />
                {errors.courses && <p className="error-text">{errors.courses}</p>}
              </div>
              <div className="profile-section">
                <label htmlFor="additional-info">Additional Information:</label>
                <textarea
                  id="additional-info"
                  name="additional-info"
                  placeholder="Enter additional information"
                  className="profile-textarea"
                />
              </div>
            </>
          )}

          <div className="profile-section">
            <label htmlFor="password">Create Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a strong password"
              className="profile-input"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className="profile-section">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Re-enter your password"
              className="profile-input"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword}</p>
            )}
          </div>

          {successMessage && <p className="success-text">{successMessage}</p>}

          <button
            type="submit"
            className="save-button"
            disabled={Object.keys(errors).length > 0}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;