import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login({ setIsLoggedIn }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const validDomains = ["@school.edu","@quinnipiac.edu"];
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const navigate = useNavigate();

  const checkValidDomain = (email) => {
    for (var i = 0; i<validDomains.length; i++) {
      if (email.endsWith(validDomains[i])) {
        return true;
      }
    }
    return false;
  }
  const handleSignUp = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter both your first and last name.");
      return;
    }
    if (!checkValidDomain(email)) {
      setError("Please use a valid school email (e.g., example@school.edu).");
      return;
    }
    setError("");
    setShowRoleSelection(true);
  };

  const handleRoleSelection = (role) => {
    setIsLoggedIn(true);
    navigate("/selectcourse", { state: { role, email, firstName, lastName } });
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Course Feedback Logger</h1>
      </div>
      {!showRoleSelection ? (
        <div className="form-container">
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your school email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="error-text">{error}</p>}
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      ) : (
        <div className="form-container">
          <h2>Select Your Role</h2>
          <button onClick={() => handleRoleSelection("Professor")}>Professor?</button>
          <button onClick={() => handleRoleSelection("Student")}>Student?</button>
        </div>
      )}
    </div>
  );
}

export default Login;