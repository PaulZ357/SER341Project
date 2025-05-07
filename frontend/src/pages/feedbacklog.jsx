import React from "react";
import { useLocation,Link } from "react-router-dom";
import "./home.css";

function FeedbackLog() {
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
            <a className="btn btn-secondary">Home</a>
  
            {/* Role-specific Buttons */}
            {role === "Professor" ? (
              <div>
                <Link to="/feedbackLog" className="btn btn-secondary">Feedback Log</Link>
                <Link to="/addAssignment" className="btn btn-secondary">Add Assignment</Link>
              </div>
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
  
  
  export default FeedbackLog;