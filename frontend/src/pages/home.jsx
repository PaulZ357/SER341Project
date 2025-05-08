import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./home.css";

function Home() {
  const location = useLocation();
  const { course } = location.state;
  console.log(course);
  const user = JSON.parse(localStorage.getItem("user"));


  return (
    <div className="app-container">
      <div className="left-sidebar">
        <nav>
          {/* Common Home Button */}
          <Link to="/home" className="btn btn-secondary" state={{ course }}>Home</Link>
          {/* user-specific Buttons */}
          {user.type === "professor" ? (
            <>
              <Link to="/seefeedback" className="btn btn-secondary"
                state={{ course }}>Feedback Log</Link>
              <a className="btn btn-secondary">Add Assignment</a>
            </>
          ) : (
            <Link to="/givefeedback" className="btn btn-secondary">Give Feedback</Link>
          )}

          {/* Profile Button */}
          <Link to="/profile" className="btn btn-secondary">Profile</Link>

          {/* Course Selection Button */}
          <Link to="/selectcourse" className="btn btn-secondary">Course Selection</Link>

          {/* Log Out Button */}
          <Link to="/" className="btn btn-secondary">Log Out</Link>
        </nav>
      </div>
      <div>
        <p>Hello and welcome to {course.courseID}: {course.courseName}</p>
      </div>
    </div>
  );
}


export default Home;