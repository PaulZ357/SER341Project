import React,{useState} from "react";
import { useLocation, Link } from "react-router-dom";
import "./profile.css";

function Profile() {
    const location = useLocation();
    const { firstName, lastName, role } = location.state || {
      firstName: " ",
      lastName: " ",
      role: "Unknown",
    };
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
  
    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(password)) {
        return "Password must be at least 8 characters long, include a number, and a special character.";
      }
      return "";
    };
  
    const handlePasswordChange = (e) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
      const error = validatePassword(newPassword);
      setPasswordError(error);
    };
  
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };
  
    const isPasswordValid = password && !passwordError && password === confirmPassword;
  
    return (
      <div className="app-container">
      
      <div className="left-sidebar">
        <nav>
  
            {/* Course Selection Button */}
            <Link to="/selectcourse" className="btn btn-secondary" 
              state={{
                firstName,
                lastName,
                role,
              }}>
            Course Selection
            </Link>
            
          {/* Log Out Button */}
          <Link to="/" className="btn btn-secondary">
            Log Out
          </Link>
        </nav>
      </div>
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <img src="https://via.placeholder.com/80" alt="Avatar" />
          </div>
          <div className="profile-info">
            <p><strong>{firstName} {lastName}</strong></p>
          </div>
          <button className="edit-button">Edit</button>
        </div>
        <div className="line"></div>
  
        {/* Role-specific Sections */}
        {role === "Student" ? (
          <>
            <div className="profile-section">
              <label htmlFor="major">Major:</label>
              <input
                type="text"
                id="major"
                name="major"
                placeholder="Enter your major"
                className="profile-input"
              />
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
        ) : role === "Professor" ? (
          <>
            <div className="profile-section">
              <label htmlFor="courses">Courses Taught:</label>
              <input
                type="text"
                id="courses"
                name="courses"
                placeholder="Enter courses you teach"
                className="profile-input"
              />
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
        ) : (
          <p>No specific role information available.</p>
        )}
  
        {/* Password Creation Section */}
        <div className="profile-section">
          <label htmlFor="password">Create Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter a strong password"
            className="profile-input"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p className="error-text">{passwordError}</p>}
        </div>
        <div className="profile-section">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Re-enter your password"
            className="profile-input"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {password && confirmPassword && password !== confirmPassword && (
            <p className="error-text">Passwords do not match.</p>
          )}
        </div>
  
        <button
          className="save-button"
          disabled={!isPasswordValid}
          onClick={() => alert("Password set successfully!")}
        >
          Save
        </button>
      </div>
      </div>
    );
  }


export default Profile;