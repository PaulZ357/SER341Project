import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login({ setIsLoggedIn }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const validDomains = ["@school.edu", "@quinnipiac.edu"];
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [professor, setProfessor] = useState(false);
  const navigate = useNavigate();

  const checkValidDomain = (email) => {
    for (var i = 0; i < validDomains.length; i++) {
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
      <div className="form-container">
        <h2>{signingUp ? "Sign Up" : "Log In"}</h2>
        <button onClick={() => setSigningUp(!signingUp)}>{signingUp ? "Log In" : "Sign Up"} instead</button>
        {signingUp ? (
          <div>
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
            <div>
              <h4 class="role">Select Your Role</h4>
              <button onClick={() => handleRoleSelection("Professor")}>Professor?</button>
              <button onClick={() => handleRoleSelection("Student")}>Student?</button>
            </div>
          </div>) : (<div/>)}
        <input
          type="email"
          placeholder="Enter your school email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Put a password field here if you want to implement a password system later. */}
        {error && <p className="error-text">{error}</p>}
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
}

export default Login;