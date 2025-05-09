import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import Table from "./../table.jsx"

import "./selectcourse.css";
import { getCourse } from "./../services/CourseService";

function Course() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="app-container">
      <div className="left-sidebar">
        <nav>
            {/* Profile Button */}
            <Link
              to="/profile"
              className="btn btn-secondary"
            >
              Profile
            </Link>

            {user.type === "professor" ? (
                        <>
                         
                          <Link to="/addcourse" className="btn btn-secondary">Add Course</Link>
                        </>
                      ) : (
                        <Link to="/givefeedback" className="btn btn-secondary">Give Feedback</Link>
                      )}



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