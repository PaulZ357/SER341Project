import React, { Component } from 'react';
import App from './login';
import { useLocation,Link } from "react-router-dom";
import "./givefeedback.css"

function Feedback() {
    const location = useLocation();
    const questions = [
        { name: "How well did you understand the central concepts and ideas in this course?", type: "rating", id: 1 },
        { name: "How well could you apply information/skills learned in this course?", type: "rating", id: 2 },
        { name: "How much were your critical thinking and/or problem solving abilities enhanced during this course?", type: "rating", id: 3 },
        { name: "What are major strengths and/or major areas of improvement for the professor?", type: "open", id: 4 },
        { name: "What are major strengths and/or major areas of improvement for the course?", type: "open", id: 5 },
    ]
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
                <a className="btn btn-secondary">Feedback Log</a>
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
        <div class="feedback-form">
            {questions.filter((question) => { return question.type === "rating" }).map((question) => (
                <form id={"rating" + question.id} class="rating-form"><h2>{question.name}</h2>
                    <div class="rating">
                        <input type="radio" id={"star5-" + question.id} name="rating" value="5" />
                        <label for={"star5-" + question.id}>&#9733;</label>
                        <input type="radio" id={"star4-" + question.id} name="rating" value="4" />
                        <label for={"star4-" + question.id}>&#9733;</label>
                        <input type="radio" id={"star3-" + question.id} name="rating" value="3" />
                        <label for={"star3-" + question.id}>&#9733;</label>
                        <input type="radio" id={"star2-" + question.id} name="rating" value="2" />
                        <label for={"star2-" + question.id}>&#9733;</label>
                        <input type="radio" id={"star1-" + question.id} name="rating" value="1" />
                        <label for={"star1-" + question.id}>&#9733;</label>
                    </div>
                </form>))}
            {questions.filter((question) => { return question.type === "open" }).map((question) => (
                <div class="open-ended">
                    <label for={question.name}>{question.name}:</label>
                    <textarea id={question.name} name={question.name}></textarea>
                </div>))}
            <button type="submit" class="submit">Submit</button>
        </div>
        </div>
    );
}

export default Feedback;

