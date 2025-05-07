import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import Table from "./../table.jsx"

import "./selectcourse.css";
import { getCourse } from "./../services/CourseService";

function Course() {
  const location = useLocation();
  const { role, firstName, lastName, email } = location.state || {
    role: "Unknown",
    firstName: " ",
    lastName: " ",
    email: " ",
  };
  return (
    <div className="app-container">
      <div className="left-sidebar">
        <nav>
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
  
          {/* Log Out Button */}
          <Link to="/" className="btn btn-secondary">
            Log Out
          </Link>
        </nav>
      </div>
      <div>
      <div className="header">
        <h1>Select your course</h1>
      </div>
        <p>Courses:</p>
        <Table/>
      </div>
    </div>
  );
}

export default Course;