import React from "react";
import { useLocation,Link } from "react-router-dom";
import "./home.css";

function Home() {
    const location = useLocation();
    const { role, firstName, lastName, email, courseID, courseName, professor } = location.state || {
      role: "Unknown",
      firstName: " ",
      lastName: " ",
      email: " ",
      courseID: " ",
      courseName: " ",
      professor: " ",
    };
  
    return (
      <div className="app-container">
        <div className="left-sidebar">
          <nav>
            {/* Common Home Button */}
            <Link
              to="/home" className="btn btn-secondary" state={{ role, email, firstName, lastName, courseID, courseName, professor }}>Home</Link>
  
            {/* Role-specific Buttons */}
            {role === "Professor" ? (
              <>
                <Link to="/seefeedback" className="btn btn-secondary" 
                state={{role,email,firstName, lastName, courseID, courseName, professor}}>Feedback Log</Link>
                <a className="btn btn-secondary">Add Assignment</a>
              </>
            ) : (
              <Link to="/givefeedback" className="btn btn-secondary" state={{
                firstName,
                lastName,
                role,
              }}>
                Give Feedback
              </Link>
            )}
  
            {/* Profile Button */}
            <Link
              to="/profile"
              state={{
                firstName,
                lastName,
                role,
              }}
              className="btn btn-secondary"
            >
              Profile
            </Link>
  
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
        <div>
          <p>Hello and welcome to {courseID} {courseName}</p>
        </div>
      </div>
    );
  }
  
  
  export default Home;