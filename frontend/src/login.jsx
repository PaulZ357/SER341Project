import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Axios from "axios";

function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [signingUp, setSigningUp] = useState(false);
  const [professor, setProfessor] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (signingUp) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 4) {
      newErrors.username = "Username must be at least 4 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const newErrors = { ...errors };
    if (name === "username" && value.length >= 4) {
      delete newErrors.username;
    }
    if (name === "password" && value.length >= 8) {
      delete newErrors.password;
    }
    if (name === "firstName" && value.trim()) {
      delete newErrors.firstName;
    }
    if (name === "lastName" && value.trim()) {
      delete newErrors.lastName;
    }
    setErrors(newErrors);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (signingUp) {
        const user = {
          name: `${formData.firstName} ${formData.lastName}`,
          username: formData.username,
          password: formData.password,
          type: professor ? "professor" : "student",
        };

        const response = await Axios.post("http://localhost:4000/users", user);
        setIsLoggedIn(true);
        navigate("/selectcourse", { state: { data: response.data } });
      } else {
        const response = await Axios.get("http://localhost:4000/users");
        const user = response.data.find(
          (user) => 
            user.username === formData.username && 
            user.password === formData.password
        );

        if (user) {
          setIsLoggedIn(true);
          navigate("/selectcourse", { 
            state: { 
              firstName: user.name.split(" ")[0],
              lastName: user.name.split(" ")[1] || "",
              role: user.type.charAt(0).toUpperCase() + user.type.slice(1)
            }
          });
        } else {
          setErrors({ form: "Invalid username or password" });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ 
        form: signingUp 
          ? "Error creating account. Please try again." 
          : "Error logging in. Please try again."
      });
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Course Feedback Logger</h1>
      </div>
      <div className="form-container">
        <h2>{signingUp ? "Sign Up" : "Log In"}</h2>
        <button onClick={() => setSigningUp(!signingUp)}>
          {signingUp ? "Log In" : "Sign Up"} instead
        </button>
        
        <form onSubmit={handleSignUp}>
          {signingUp && (
            <>
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName && <p className="error-text">{errors.firstName}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName && <p className="error-text">{errors.lastName}</p>}
              </div>
              <div>
                <h4 className="role">Select Your Role</h4>
                <button
                  type="button"
                  className={professor ? "gray-button" : ""}
                  onClick={() => setProfessor(true)}
                >
                  Professor
                </button>
                <button
                  type="button"
                  className={professor ? "" : "gray-button"}
                  onClick={() => setProfessor(false)}
                >
                  Student
                </button>
              </div>
            </>
          )}
          
          <div>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <p className="error-text">{errors.username}</p>}
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          {errors.form && <p className="error-text">{errors.form}</p>}
          
          <button type="submit">
            {signingUp ? "Sign Up" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;