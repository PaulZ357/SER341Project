import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

function Assignments() {
    const user = JSON.parse(localStorage.getItem("user"));
    const course = JSON.parse(localStorage.getItem("course"));

    return (
      <div className="app-container">
        <div className="left-sidebar">
          <nav>
            {/* Common Home Button */}
            <a className="btn btn-secondary">Home</a>

            {/* Role-specific Buttons */}
            {user.type === "professor" ? (
              <div>
                <Link to="/feedbackLog" className="btn btn-secondary">Feedback Log</Link>
                <Link to="/assignments" className="btn btn-secondary">Add Assignment</Link>
              </div>
            ) : (
              <Link to="/givefeedback" className="btn btn-secondary" >
                Give Feedback
              </Link>
            )}

            {/* Profile Button */}
            <Link
              to="/profile"
              className="btn btn-secondary"
            >
              Profile
            </Link>

            {/* Log Out Button */}
            <Link to="/" className="btn btn-secondary">
              Log Out
            </Link>
          </nav>
        </div>
        <div>
          <p>Hello and welcome to {course.courseID} {course.courseName}</p>
        </div>
      </div>
    );
  }


  export default Assignments;