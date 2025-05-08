import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Axios from "axios";

function Login({ setIsLoggedIn }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  const [professor, setProfessor] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (signingUp) {
      if (!firstName.trim() || !lastName.trim()) {
        setError("Please enter both your first and last name.");
        return;
      }
      const user = {
        name: `${firstName} ${lastName}`,
        username: username,
        password: "password", // Placeholder password, will be replaced with a secure system later
        type: professor ? "professor" : "student"
      }
      console.log(user);
      Axios.post("http://localhost:4000/users", user)
        .then((response) => {
          setIsLoggedIn(true);
          const data = response.data;
          console.log("User created:", data);
          navigate("/selectcourse", { state: { data } });
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          if (error.status >= 400 && error.status < 500) {
            setError("Invalid username.");
          } else if (error.status >= 500) {
            setError("An error occurred while creating your account. Please try again.");
          }
          return;
        });
    }
    else {
      Axios.get("http://localhost:4000/users").then((response) => {
        const user = response.data.find(user => user.username === username);
        if (user) {
          setIsLoggedIn(true);
          console.log("User created:", user);
          navigate("/selectcourse", { state: { user } });
        }
        else {
          setError("User not found. Please sign up first.");
          return;
        }
      }).catch((error) => {
        console.error("Error fetching user:", error);
        setError("An error occurred while logging in. Please try again.");
        return;
      })
    }
    setError("");

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
              <button class={professor ? ("gray-button") : ("")} onClick={() => setProfessor(true)}>Professor</button>
              <button class={professor ? ("") : ("gray-button")} onClick={() => setProfessor(false)}>Student</button>
            </div>
          </div>) : (<div />)}
        <input
          type="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* Put a password field here if you want to implement a password system later. */}
        {error && <p className="error-text">{error}</p>}
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
}

export default Login;